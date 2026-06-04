import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { adminApi, checkAuth, getApiErrorMessage, logout } from '../lib/api';
import CloudinaryImageUpload from '../components/admin/CloudinaryImageUpload';

const TABS = ['Projects', 'Services', 'Experience', 'Testimonials', 'About'];

function CrudList({ items, fields, onEdit, onDelete }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item._id} className="card-surface p-4 flex flex-wrap justify-between gap-3">
          <div>
            {fields.map((f) => (
              <p key={f.key} className="text-sm">
                <span className="text-white/50">{f.label}: </span>
                <span>{String(item[f.key] ?? '').slice(0, 120)}</span>
              </p>
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" className="btn-outline !py-2 !px-4 text-xs" onClick={() => onEdit(item)}>
              Edit
            </button>
            <button
              type="button"
              className="text-xs px-4 py-2 rounded-full border border-red-500/40 text-red-400 hover:bg-red-500/10"
              onClick={() => onDelete(item._id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('Projects');
  const [data, setData] = useState({ projects: [], services: [], experience: [], testimonials: [], about: {} });
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    try {
      const [projects, services, experience, testimonials, about] = await Promise.all([
        adminApi.projects.list(),
        adminApi.services.list(),
        adminApi.experience.list(),
        adminApi.testimonials.list(),
        adminApi.about.get(),
      ]);
      setData({ projects, services, experience, testimonials, about });
    } catch (err) {
      toast.error(getApiErrorMessage(err, 'Could not load admin data'));
    }
  };

  useEffect(() => {
    checkAuth()
      .then((r) => {
        if (!r.authenticated) navigate('/admin-login');
        else load();
      })
      .catch(() => navigate('/admin-login'));
  }, [navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin-login');
  };

  const resetForm = () => {
    setForm({});
    setEditingId(null);
  };

  const saveProject = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      techStack: (form.techStack || '').split(',').map((s) => s.trim()).filter(Boolean),
      order: Number(form.order) || 0,
    };
    if (editingId) await adminApi.projects.update(editingId, payload);
    else await adminApi.projects.create(payload);
    toast.success('Project saved');
    resetForm();
    load();
  };

  const saveService = async (e) => {
    e.preventDefault();
    const payload = { ...form, order: Number(form.order) || 0 };
    if (editingId) await adminApi.services.update(editingId, payload);
    else await adminApi.services.create(payload);
    toast.success('Service saved');
    resetForm();
    load();
  };

  const saveExperience = async (e) => {
    e.preventDefault();
    const payload = { ...form, order: Number(form.order) || 0 };
    if (editingId) await adminApi.experience.update(editingId, payload);
    else await adminApi.experience.create(payload);
    toast.success('Experience saved');
    resetForm();
    load();
  };

  const saveTestimonial = async (e) => {
    e.preventDefault();
    const payload = { ...form, order: Number(form.order) || 0 };
    if (editingId) await adminApi.testimonials.update(editingId, payload);
    else await adminApi.testimonials.create(payload);
    toast.success('Testimonial saved');
    resetForm();
    load();
  };

  const saveAbout = async (e) => {
    e.preventDefault();
    const existing = data.about || {};
    try {
      await adminApi.about.update({
        bio: form.bio,
        whyMeIntro: existing.whyMeIntro,
        highlights: existing.highlights,
        skills: existing.skills,
        videoUrl: form.videoUrl,
        profileImageUrl: form.profileImageUrl,
        contactEmail: form.contactEmail,
        linkedIn: form.linkedIn,
        github: form.github,
        stats: {
          years: form.years,
          clients: form.clients,
          apps: form.apps,
        },
      });
      toast.success('About updated');
      load();
    } catch (err) {
      toast.error(getApiErrorMessage(err, 'Could not save about'));
    }
  };

  const startEditAbout = () => {
    const a = data.about;
    setForm({
      bio: a.bio,
      videoUrl: a.videoUrl,
      profileImageUrl: a.profileImageUrl,
      contactEmail: a.contactEmail,
      linkedIn: a.linkedIn,
      github: a.github,
      years: a.stats?.years,
      clients: a.stats?.clients,
      apps: a.stats?.apps,
    });
    setEditingId('about');
  };

  useEffect(() => {
    if (tab === 'About' && data.about?._id) startEditAbout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, data.about?._id]);

  const inputClass =
    'w-full bg-transparent border rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-accent';
  const inputStyle = { borderColor: 'var(--color-border)' };

  return (
    <div className="min-h-screen section-pad py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="heading-display text-2xl font-bold">Portfolio Admin</h1>
        <button type="button" onClick={handleLogout} className="btn-outline !py-2 !px-4 text-sm">
          Logout
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setTab(t);
              resetForm();
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              tab === t ? 'bg-accent text-white' : 'border text-white/70'
            }`}
            style={tab !== t ? { borderColor: 'var(--color-border)' } : { background: 'var(--color-accent)' }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Projects' && (
        <div className="grid lg:grid-cols-2 gap-8">
          <form onSubmit={saveProject} className="card-surface p-6 space-y-3">
            <h2 className="font-semibold mb-2">{editingId ? 'Edit' : 'Add'} Project</h2>
            {['name', 'description', 'badge', 'badgeSub', 'order'].map((key) => (
              <input
                key={key}
                placeholder={key}
                value={form[key] ?? ''}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className={inputClass}
                style={inputStyle}
                required={key === 'name' || key === 'description'}
              />
            ))}
            <CloudinaryImageUpload
              label="Project image"
              value={form.imageUrl ?? ''}
              onChange={(url) => setForm({ ...form, imageUrl: url })}
              folder="projects"
            />
            <input
              placeholder="techStack (comma separated)"
              value={form.techStack ?? ''}
              onChange={(e) => setForm({ ...form, techStack: e.target.value })}
              className={inputClass}
              style={inputStyle}
            />
            <div className="flex gap-2">
              <button type="submit" className="btn-primary !py-2 !px-4 text-sm">
                Save
              </button>
              {editingId && (
                <button type="button" className="btn-outline !py-2 !px-4 text-sm" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
          <CrudList
            items={data.projects}
            fields={[
              { key: 'name', label: 'Name' },
              { key: 'description', label: 'Description' },
            ]}
            onEdit={(item) => {
              setEditingId(item._id);
              setForm({ ...item, techStack: (item.techStack || []).join(', ') });
            }}
            onDelete={async (id) => {
              await adminApi.projects.remove(id);
              toast.success('Deleted');
              load();
            }}
          />
        </div>
      )}

      {tab === 'Services' && (
        <div className="grid lg:grid-cols-2 gap-8">
          <form onSubmit={saveService} className="card-surface p-6 space-y-3">
            <h2 className="font-semibold mb-2">{editingId ? 'Edit' : 'Add'} Service</h2>
            {['title', 'description', 'order'].map((key) => (
              <input
                key={key}
                placeholder={key}
                value={form[key] ?? ''}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className={inputClass}
                style={inputStyle}
                required={key !== 'order'}
              />
            ))}
            <button type="submit" className="btn-primary !py-2 !px-4 text-sm">
              Save
            </button>
          </form>
          <CrudList
            items={data.services}
            fields={[{ key: 'title', label: 'Title' }]}
            onEdit={(item) => {
              setEditingId(item._id);
              setForm(item);
            }}
            onDelete={async (id) => {
              await adminApi.services.remove(id);
              load();
            }}
          />
        </div>
      )}

      {tab === 'Experience' && (
        <div className="grid lg:grid-cols-2 gap-8">
          <form onSubmit={saveExperience} className="card-surface p-6 space-y-3">
            <h2 className="font-semibold mb-2">{editingId ? 'Edit' : 'Add'} Role</h2>
            {['company', 'role', 'period', 'description', 'order'].map((key) => (
              <input
                key={key}
                placeholder={key}
                value={form[key] ?? ''}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className={inputClass}
                style={inputStyle}
              />
            ))}
            <button type="submit" className="btn-primary !py-2 !px-4 text-sm">
              Save
            </button>
          </form>
          <CrudList
            items={data.experience}
            fields={[
              { key: 'role', label: 'Role' },
              { key: 'company', label: 'Company' },
            ]}
            onEdit={(item) => {
              setEditingId(item._id);
              setForm(item);
            }}
            onDelete={async (id) => {
              await adminApi.experience.remove(id);
              load();
            }}
          />
        </div>
      )}

      {tab === 'Testimonials' && (
        <div className="grid lg:grid-cols-2 gap-8">
          <form onSubmit={saveTestimonial} className="card-surface p-6 space-y-3">
            <h2 className="font-semibold mb-2">{editingId ? 'Edit' : 'Add'} Testimonial</h2>
            {['name', 'role', 'company', 'text', 'order'].map((key) => (
              <input
                key={key}
                placeholder={key}
                value={form[key] ?? ''}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className={inputClass}
                style={inputStyle}
              />
            ))}
            <CloudinaryImageUpload
              label="Avatar"
              value={form.avatar ?? ''}
              onChange={(url) => setForm({ ...form, avatar: url })}
              folder="testimonials"
            />
            <button type="submit" className="btn-primary !py-2 !px-4 text-sm">
              Save
            </button>
          </form>
          <CrudList
            items={data.testimonials}
            fields={[{ key: 'name', label: 'Name' }]}
            onEdit={(item) => {
              setEditingId(item._id);
              setForm(item);
            }}
            onDelete={async (id) => {
              await adminApi.testimonials.remove(id);
              load();
            }}
          />
        </div>
      )}

      {tab === 'About' && (
        <form onSubmit={saveAbout} className="card-surface p-6 space-y-3 max-w-2xl">
          <h2 className="font-semibold mb-2">About & Settings</h2>
          <textarea
            placeholder="bio"
            rows={8}
            value={form.bio ?? ''}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className={inputClass}
            style={inputStyle}
          />
          {['years', 'clients', 'apps'].map((key) => (
            <input
              key={key}
              placeholder={`stat: ${key}`}
              value={form[key] ?? ''}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className={inputClass}
              style={inputStyle}
            />
          ))}
          {['videoUrl', 'contactEmail', 'linkedIn', 'github'].map((key) => (
            <input
              key={key}
              placeholder={key}
              value={form[key] ?? ''}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className={inputClass}
              style={inputStyle}
            />
          ))}
          <CloudinaryImageUpload
            label="Profile photo"
            value={form.profileImageUrl ?? ''}
            onChange={(url) => setForm({ ...form, profileImageUrl: url })}
            folder="profile"
          />
          <button type="submit" className="btn-primary !py-2 !px-4 text-sm">
            Save About
          </button>
        </form>
      )}
    </div>
  );
}
