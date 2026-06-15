import { APP_NAME } from "@/lib/constants";

const currentYear = new Date().getFullYear();
const Footer = () => {
    return (
        <footer className="border-t">
            <div className="mx-auto max-w-7xl w-full py-5 md:px-10 text-center">
                <p>&copy; {currentYear} {APP_NAME}. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;