import Link from "next/link"

export const metadata = {
  title: 'About Page',
  description: 'Learn about us'
}

function About() {
  return (
    <div>
      <h1 className="text-4xl font-500 font-monkey">Learn About Us</h1>

      {/* <button><Link href="/">Home</Link></button> */}
    </div>
  )
}

export default About
