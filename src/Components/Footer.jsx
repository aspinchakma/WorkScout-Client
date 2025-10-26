const Footer = () => {
  return (
    <div className="text-[#909090]  p-10 bg-[#282828]">
      <footer className=" w-[90%] lg:w-[77%] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="">
          <h6 className="font-bold mb-2 text-white">For Candidates</h6>
          <p className="link link-hover">Browse Jobs</p>
          <p className="link link-hover">Design</p>
          <p className="link link-hover">Marketing</p>
          <p className="link link-hover">Advertisement</p>
        </div>
        <div className="">
          <h6 className="font-bold mb-2 text-white">Company</h6>
          <p className="link link-hover">About us</p>
          <p className="link link-hover">Contact</p>
          <p className="link link-hover">Jobs</p>
          <p className="link link-hover">Press kit</p>
        </div>
        <div className="">
          <h6 className="font-bold mb-2 text-white">Legal</h6>
          <p className="link link-hover">Terms of use</p>
          <p className="link link-hover">Privacy policy</p>
          <p className="link link-hover">Cookie policy</p>
        </div>
        <div className="">
          <h6 className="font-bold mb-2 text-white">Legal</h6>
          <p className="link link-hover">Terms of use</p>
          <p className="link link-hover">Privacy policy</p>
          <p className="link link-hover">Cookie policy</p>
        </div>
      </footer>
      <div className="divider"></div>
      <h3 className="text-center">
        © Theme by Purethemes.net. All Rights Reserved.
      </h3>
    </div>
  );
};

export default Footer;
