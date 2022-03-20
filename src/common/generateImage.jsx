function GenerateImage({ img, animation = " ", ...rest }) {
  return (
    <div className={`"relative w-full h-full  " ${rest}`}>
      <img
        className={`"absolute scale-[90%] rounded-md " ${animation}`}
        src={img}
        alt={"image"}
      />
    </div>
  );
}

export default GenerateImage;
