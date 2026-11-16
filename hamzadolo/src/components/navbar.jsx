import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Logo from "./logo";

// Each menu opens a dropdown of placeholder photo cards only.
const MENUS = [
  {
    label: "Projects",
    photos: ["/performance4.png", "/performance2.png", "/performance3.png"],
  },
  {
    label: "Timeline",
    photos: ["/performance5.jpg", "/performance7.png", "/performance1.png"],
  },
  {
    label: "Consulting",
    photos: ["/performance6.png", "/performance4.png", "/performance7.png"],
  },
];

const spring = { type: "spring", stiffness: 320, damping: 32 };

const Chevron = ({ open }) => (
  <motion.svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    aria-hidden="true"
    animate={{ rotate: open ? 180 : 0 }}
    transition={spring}
  >
    <path
      d="M2 3.5L5 6.5L8 3.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);

const Navbar = () => {
  const [active, setActive] = useState(null);
  const menu = MENUS.find((m) => m.label === active);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header>
      <nav
        aria-label="Main"
        onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
      >
        <div className="bar">
          <Logo />

          <ul>
            {MENUS.map(({ label }) => {
              const open = active === label;
              return (
                <li key={label}>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls="nav-dropdown"
                    data-open={open}
                    onPointerEnter={(e) =>
                      e.pointerType === "mouse" && setActive(label)
                    }
                    onClick={(e) =>
                      // Mouse users open on hover, so a click keeps it open;
                      // touch and keyboard toggle.
                      setActive(
                        e.nativeEvent.pointerType === "mouse" || !open
                          ? label
                          : null,
                      )
                    }
                  >
                    {open && (
                      <motion.span
                        layoutId="nav-pill"
                        className="pill"
                        transition={spring}
                      />
                    )}
                    <span className="relative">{label}</span>
                    <span className="relative">
                      <Chevron open={open} />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="flex-center gap-3">
            <button>
                <img src="/search.svg" alt="Search"></img>
            </button>

          </div>

          <a
            href="#contact"
            className="contact"
            onPointerEnter={() => setActive(null)}
          >
            Contact Us 
          </a>
        </div>

        <AnimatePresence initial={false}>
          {menu && (
            <motion.div
              id="nav-dropdown"
              key="dropdown"
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={spring}
            >
              <div className="cards">
                <AnimatePresence mode="popLayout" initial={false}>
                  {menu.photos.map((src, i) => (
                    <motion.div
                      key={`${menu.label}-${i}`}
                      className="card"
                      initial={{ opacity: 0, y: 14, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ ...spring, delay: i * 0.05 }}
                      whileHover={{ y: -4 }}
                    >
                      <img src={src} alt="" loading="lazy" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
