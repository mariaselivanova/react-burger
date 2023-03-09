import { Link } from "react-router-dom";
import RedirectLinkStyle from './RedirectLink.module.css';
import PropTypes from 'prop-types';

export function RedirectLink({ linktext, link, linkquestion }) {
  return (
    <div className={RedirectLinkStyle.redirect}>
      <p className="text text_type_main-default text_color_inactive">{linkquestion}</p>
      <Link to={link} className={`${RedirectLinkStyle.link} text text_type_main-default`}>{linktext}</Link>
    </div>
  )
}

RedirectLink.propTypes = {
  linktext: PropTypes.string,
  link: PropTypes.string,
  linkquestion: PropTypes.string,
}
