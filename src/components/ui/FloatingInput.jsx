export default function FloatingInput({
  label,
  name,
  type = "text",
  onChange,
}) {

  return (

    <div className="relative">

      <input
        type={type}
        name={name}
        placeholder=" "
        onChange={onChange}
        className="
          peer
          w-full
          bg-transparent
          border-b
          border-black/20
          pt-6
      
          text-black
          outline-none
          focus:border-black
          transition
        "
      />

      <label
        className="
          absolute
          left-0
          top-4
          text-black/40
          text-sm
          pointer-events-none
          transition-all

          peer-placeholder-shown:top-4
          peer-placeholder-shown:text-sm

          peer-focus:top-0
          peer-focus:text-xs
          peer-focus:text-black

          peer-not-placeholder-shown:top-0
          peer-not-placeholder-shown:text-xs
        "
      >
        {label}
      </label>

    </div>

  );

}