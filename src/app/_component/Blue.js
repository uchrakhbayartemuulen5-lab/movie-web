export const Blue = () => {
  return (
    <div>
      <button className=" bg-blue-500 w-full h-[230px] justify-center ">
        <div className="flex flex-row justify-around ">
          <div className=" flex flex-col items-start ">
            <img className="w-[100px] h-[30px] " src="Logo (4).png" />
            <p className="text-white">© 2024 Movie Z. All Rights Reserved.</p>
          </div>

          <div className="flex justify-center items-center flex-col">
            <div>
              <p className="text-white">Contact Information</p>
            </div>
            <div className="justify-center items-center">
              <div
                className="flex h-[30px]
                      flex-col "
              >
                <p className="text-white ">Email:</p>
                <p className="text-white">support@movieZ.com</p>
                <p className="text-white">phone:+976(11)123-4567</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <button className="text-white">Follow us</button>
            <p className="text-white underline ">
              Facebook Instagram Twitter Youtube
            </p>
          </div>
        </div>
      </button>
    </div>
  );
};
