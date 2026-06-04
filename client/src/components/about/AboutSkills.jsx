import { useMemo } from 'react';
import { DEFAULT_SKILLS } from '../../content/aak.constants';

const FEATURED = [
  'Next.js',
  'React.js',
  'Node.js',
  'TypeScript',
  'SvelteKit',
  'Supabase',
  'MongoDB',
  'PostgreSQL',
  'Tailwind',
  'AWS S3',
  'Stripe',
  'MERN Stack',
];

export default function AboutSkills({ about }) {
  const skills = useMemo(() => {
    const fromApi = about?.skills?.filter(Boolean);
    const list = fromApi?.length ? fromApi : DEFAULT_SKILLS;
    const featured = FEATURED.filter((s) => list.includes(s));
    const rest = list.filter((s) => !FEATURED.includes(s)).slice(0, 8);
    return [...featured, ...rest].slice(0, 20);
  }, [about]);

  if (!skills.length) return null;

  return (
    <div className="about-skills" data-name="about-skills">
      <p className="about-skills-label">Core stack</p>
      <ul className="about-skills-list">
        {skills.map((skill) => (
          <li key={skill} className="about-skills-pill">
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
