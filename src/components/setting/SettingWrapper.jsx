export default function SettingWrapper({title, children, className}) {
  return (
    <div className={`flex flex-col w-full p-5 mb-5 ${className}`}>
        <h1 className='text-4xl font-bold font-sora'>{title}</h1>
        {children}
    </div>
  )
}
