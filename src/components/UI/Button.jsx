export default function Button({ children, textOnly, className, ...props }) {
    let cssClases = textOnly ? 'text-button' : 'button';
    cssClases += ' ' + className;

    return(
        <button className={cssClases} {...props}>{children}</button>
    );
}