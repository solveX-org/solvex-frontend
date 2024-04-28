import style from './index'
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function CardCOmponent() {
  const { ref, inView } = useInView();

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div ref={ref}>
      <motion.div
        className="card flex flex-wrap gap-4"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={cardVariants}
      >
        {/* Card content */}
        <div className='h-[4rem] w-[4rem] bg-red-900'></div>
        <div className='h-[4rem] w-[4rem] bg-red-900'></div>
        <div className='h-[4rem] w-[4rem] bg-red-900'></div>
        <div className='h-[4rem] w-[4rem] bg-red-900'></div>
        <div className='h-[4rem] w-[4rem] bg-red-900'></div>
        <div className='h-[4rem] w-[4rem] bg-red-900'></div>
      </motion.div>
    </div>
  );
};


export default CardCOmponent