import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="fixed inset-x-3 top-[max(1rem,env(safe-area-inset-top))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-[101] overflow-y-auto surface-card p-5 sm:inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:max-h-[90vh] md:w-full md:max-w-3xl md:-translate-x-1/2 md:-translate-y-1/2 md:p-10"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X size={22} />
            </button>

            {project.imageUrl && (
              <div className="rounded-xl overflow-hidden mb-6 aspect-video">
                <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
            )}

            <h3 className="heading-display text-3xl md:text-4xl font-bold mb-3">{project.name}</h3>
            <p className="text-lg mb-6 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              {project.description}
            </p>

            {project.techStack?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: 'rgba(254, 75, 1, 0.12)',
                      color: 'var(--color-accent)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {(project.badge || project.badgeSub) && (
              <div className="flex items-baseline gap-2 mb-6">
                {project.badge && (
                  <span className="text-3xl font-bold text-accent" style={{ color: 'var(--color-accent)' }}>
                    {project.badge}
                  </span>
                )}
                {project.badgeSub && (
                  <span style={{ color: 'var(--color-muted)' }}>{project.badgeSub}</span>
                )}
              </div>
            )}

            <button type="button" onClick={onClose} className="btn-outline">
              Close
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
