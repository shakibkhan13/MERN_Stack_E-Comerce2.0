type Props = {
    name: string;
    avatar?: string;
    size?: "sm" | "md" | "lg";
};

export default function UserAvatar({ name, avatar, size = "md" }: Props) {
    const sizes = {
        sm: "h-10 w-10 text-sm",
        md: "h-12 w-12 text-lg",
        lg: "h-20 w-20 text-2xl",
    };

    return (
        <div
            className={`${sizes[size]} rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold overflow-hidden`}
        >
            {avatar ? (
                <img src={avatar} alt={name} className="h-full w-full object-cover" />
            ) : (
                name.charAt(0).toUpperCase()
            )}
        </div>
    );
}
