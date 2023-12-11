const SSwrapper = ({
    children,
    style,
    className
}) => {



    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.30000001192092896)',
                backgroundColor: 'rgba(255, 255, 255, 1)',
                minHeight: '40px',
                borderRadius: '20px',
                boxSizing: "border-box",
                ...style
            }}
            className={className}
        >
            {children}
        </div>
    );
};

export default SSwrapper;
