import React from "react";
import { Link } from "react-router-dom";
import { FEATURES } from "../../models/appData";
import GlassCard from "../../components/GlassCard";
import GradientText from "../../components/GradientText";
import { useInView, staggerDelay } from "../../controllers/useScrollAnimation";
import "./Features.css";

export default function Features() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="features section" id="features">
      <div className="section__inner">
        <div className="section__label">Everything you need</div>
        <h2 className="section__title">
          Packed with <GradientText>Features</GradientText>
        </h2>
        <p className="section__sub">
          Built for quick expression, deep engagement, and meaningful connections.
        </p>

        <div className="features__bento" ref={ref}>
          {FEATURES.map((f, i) => {
            const isFullWidth = f.span === "full";
            
            const cardContent = (
              <GlassCard
                className={`features__card ${inView ? "features__card--visible" : ""} ${isFullWidth ? "features__card--full-width" : ""} ${f.link ? "features__card--clickable" : ""}`}
                style={{ transitionDelay: staggerDelay(i, 90) }}
              >
                <div className="features__icon">{f.icon}</div>
                <h3 className="features__title">{f.title}</h3>
                <p className="features__desc">{f.desc}</p>
                {f.link && (
                  <span className="features__link-text">
                    {f.linkText} →
                  </span>
                )}
                <div className="features__glow" />
              </GlassCard>
            );

            if (f.link) {
              return (
                <Link
                  key={f.id}
                  to={f.link}
                  className={`features__link-wrapper ${isFullWidth ? "features__link-wrapper--full-width" : ""}`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  {cardContent}
                </Link>
              );
            }

            return <React.Fragment key={f.id}>{cardContent}</React.Fragment>;
          })}
        </div>
      </div>
    </section>
  );
}
