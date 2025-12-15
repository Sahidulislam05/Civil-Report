import { GithubIcon, LinkedinIcon } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <div>
      <footer className="footer footer-horizontal footer-center bg-base-300 text-base-content rounded p-10">
        <nav className="grid grid-flow-col gap-4">
          <Link to={"/about-us"} className="link link-hover">
            About us
          </Link>
          <Link to={"/contact"} className="link link-hover ">
            Contact
          </Link>
          <Link to={"/all-issues"} className="link link-hover">
            Issues
          </Link>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <Link to={"https://www.linkedin.com/in/sahidulislam05"}>
              <LinkedinIcon></LinkedinIcon>
            </Link>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
            <Link to={"https://github.com/Sahidulislam05"}>
              <GithubIcon></GithubIcon>
            </Link>
          </div>
        </nav>
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by Civil
            Report Ltd
          </p>
        </aside>
      </footer>
    </div>
  );
}
