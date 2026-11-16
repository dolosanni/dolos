import { motion } from "motion/react";

// Geometric "dolo" wordmark: each letter is a stroked shape that draws itself
// in on mount, then hops in sequence when the logo is hovered.
const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i * 0.14, duration: 0.7, ease: [0.65, 0, 0.35, 1] },
      opacity: { delay: i * 0.14, duration: 0.01 },
    },
  }),
};

const hop = {
  rest: { y: 0 },
  hover: (i) => ({
    y: [0, -4, 0],
    transition: { delay: i * 0.06, duration: 0.45, ease: "easeOut" },
  }),
};

const stroke = {
  fill: "none",
  strokeWidth: 4,
  strokeLinecap: "round",
  variants: draw,
};

const Logo = ({ className = "" }) => {
  return (
    <motion.a
      href="/"
      aria-label="dolo home"
      className={`inline-flex items-center ${className}`}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.94 }}
    >
      <motion.svg
        width="64"
        height="26"
        viewBox="0 0 78 32"
        role="img"
        initial="hidden"
        animate="visible"
      >
        <title>dolo</title>
        <defs>
          <linearGradient id="dolo-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0894ff" />
            <stop offset="34%" stopColor="#c959dd" />
            <stop offset="68%" stopColor="#ff2e54" />
            <stop offset="100%" stopColor="#ff9004" />
          </linearGradient>
        </defs>

        {/* d */}
        <motion.g variants={hop} custom={0}>
          <motion.circle cx="10" cy="20" r="8" stroke="#fff" custom={0} {...stroke} />
          <motion.path d="M18 4V28" stroke="#fff" custom={0.5} {...stroke} />
        </motion.g>

        {/* o */}
        <motion.g variants={hop} custom={1}>
          <motion.circle cx="34" cy="20" r="8" stroke="#fff" custom={1.5} {...stroke} />
        </motion.g>

        {/* l */}
        <motion.g variants={hop} custom={2}>
          <motion.path d="M50 4V28" stroke="#fff" custom={2.5} {...stroke} />
        </motion.g>

        {/* o — the accent letter */}
        <motion.g variants={hop} custom={3}>
          <motion.circle
            cx="66"
            cy="20"
            r="8"
            stroke="url(#dolo-gradient)"
            custom={3.5}
            {...stroke}
          />
        </motion.g>
      </motion.svg>
    </motion.a>
  );
};

export default Logo;
