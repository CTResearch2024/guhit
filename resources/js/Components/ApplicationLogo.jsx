export default function ApplicationLogo({ w = '10', h = '10', className = '' }) {
    return (
        <img 
            src="/img/logo2.png" 
            alt="Logo" 
            className={`w-${w} h-${h} ${className}`} 
        />
    );
}
