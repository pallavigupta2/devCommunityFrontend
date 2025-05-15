import React from 'react'

const Footer = () => {
  return (
    // <footer className="footer footer-horizontal footer-center bg-neutral text-primary-content p-10 fixed bottom-0">
  <footer className="footer sm:footer-horizontal footer-center bg-neutral text-white p-4 fixed bottom-0">
  <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
  </aside>
</footer>
  )
}

export default Footer