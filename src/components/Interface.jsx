export const Interface = () => {
  return (
    <>
      {/* Page 1 — Beginning */}
      <section className="page">
        <div className="introduction">
          <h2 className="introduction__title">
            A Day in the Life of a Developer
          </h2>
          <p className="introduction__subtitle">
            Coffee ready. Laptop open. Confidence at 100%.
          </p>
        </div>
      </section>

      {/* Page 2 — Focus */}
      <section className="page">
        <div className="introduction">
          <h2 className="introduction__title">Deep Focus</h2>
          <p className="introduction__subtitle">
            The code flows. Everything makes sense. “This won’t take long.”
          </p>
        </div>
      </section>

      {/* Page 3 — Debugging */}
      <section className="page">
        <div className="introduction">
          <h2 className="introduction__title">Debugging Reality</h2>
          <p className="introduction__subtitle">
            One error turns into three. Motivation drops. Logic disappears.
          </p>
        </div>
      </section>

      {/* Page 4 — Breakthrough */}
      <section className="page">
        <div className="introduction">
          <h2 className="introduction__title">The Breakthrough</h2>
          <p className="introduction__subtitle">
            A small change. One line fixed. Suddenly… it works.
          </p>
        </div>
      </section>

      {/* (Optional Page 5 — Closure, if you want) */}

      <section className="page">
        <div className="introduction">
          <h2 className="introduction__title">End of the Day</h2>
          <p className="introduction__subtitle">
            Laptop closed. Tired — but proud.
          </p>
        </div>
      </section>
    </>
  );
};
