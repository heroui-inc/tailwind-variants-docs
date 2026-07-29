export const slotsOverride = `const card = tv({
  slots: {
    base: 'md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-gray-900',
    avatar:
      'rounded-full mx-auto drop-shadow-lg size-24 md:w-48 md:h-auto md:rounded-none',
    wrapper: 'flex-1 pt-6 text-center space-y-4 md:p-8 md:text-left',
    description: 'text-md font-medium',
    infoWrapper: 'font-medium',
    name: 'text-sm text-sky-500 dark:text-sky-400',
    role: 'text-sm text-slate-700 dark:text-slate-500'
  }
});

const { base, avatar, wrapper, description, infoWrapper, name, role } = card();

return (
  <figure className={base({ class: 'bg-purple-100 dark:bg-purple-800' })}>
    <img
      className={avatar()}
      src="/intro-avatar.png"
      alt=""
      width="384"
      height="512"
    />
    <div className={wrapper()}>
      <blockquote>
        <p className={description()}>
          “Tailwind variants allows you to reduce repeated code in your project
          and make it more readable. They fixed the headache of building a
          design system with TailwindCSS.”
        </p>
      </blockquote>
      <figcaption className={infoWrapper()}>
        <div
          className={name({ class: 'text-purple-500 dark:text-purple-200' })}
        >
          Zoey Lang
        </div>
        <div className={role({ class: 'dark:text-purple-100' })}>
          Full-stack developer, HeroUI
        </div>
      </figcaption>
    </div>
  </figure>
);`;

export default slotsOverride;
