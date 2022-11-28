import "./credits.scss"
import { motion } from "framer-motion";
import { creditsFadeInUpVariants } from "../../motionUtils";

const Credits = () => {
	return (
		<motion.footer
			variants={creditsFadeInUpVariants}
			initial='initial'
			animate='animate'
			exit='exit'
			className='Credits'
		>
			<span>BY PHU TUAN AND FRIENDS</span>
		</motion.footer>
	)
}

export default Credits;
