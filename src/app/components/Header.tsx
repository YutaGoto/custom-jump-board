export default function Header() {
  return (
    <header>
      <nav>
        <a href="/" className="circle transparent">
          <i>home</i>
        </a>
        <h5 className="max center-align">Custom Jump Board</h5>
        <button className="transparent" disabled type="button">
          Discord Login (soon)
        </button>
      </nav>
    </header>
  );
}
