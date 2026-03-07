export function GlobalBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Animated gradient orbs */}
            <div className="gradient-orb w-[600px] h-[600px] bg-green-500 top-[5%] left-[-10%]" />
            <div className="gradient-orb w-[500px] h-[500px] bg-emerald-400 top-[60%] right-[-8%]" style={{ animationDelay: '5s' }} />
            <div className="gradient-orb w-[400px] h-[400px] bg-teal-500 top-[35%] left-[50%]" style={{ animationDelay: '10s' }} />
            <div className="gradient-orb w-[350px] h-[350px] bg-green-600 bottom-[10%] left-[20%]" style={{ animationDelay: '15s' }} />

            {/* Subtle dot grid */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.025) 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Top gradient fade */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-transparent to-zinc-950/80" />
        </div>
    );
}
