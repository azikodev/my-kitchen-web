function Preview({
  images,
  ingredients,
  title,
  cookingTime,
  method,
  category,
}) {
  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <div className="w-11/12 max-w-5xl">
          <div className="modal-action justify-center rounded-xl bg-white">
            <div className="flex gap-1 flex-col md:flex-row rounded-xl p-4 shadow-xl md:grid-cols-2 md:gap-8 md:p-6">
              <div className="carousel carousel-center md:w-1/2 md:max-w-md max-w-lg w-full space-x-4 rounded-box bg-neutral p-4">
                {images && images.map((image) => {
                  return (
                    <div key={image} className="carousel-item">
                      <img
                        src={image}
                        alt=""
                        className="h-[300px] w-[150px] rounded-xl object-cover sm:w-[300px] md:h-full"
                        height={600}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="w-1/2">
                <h1 className="mb-5 text-3xl font-bold">
                  {title.current?.value}
                </h1>
                <div>
                  <span className="mb-2 text-base font-bold">Categoies:</span>
                  <p className="mb-5">{category}</p>
                  <span className="mb-2 text-base font-bold">Ingredients:</span>
                  <p className="mb-5">
                    {ingredients.length > 0 &&
                      ingredients.map((ing, index, ingArray) => {
                        return (
                          <span style={{ display: "inline-block" }} key={ing}>
                            {ing}
                            {index == ingArray.length - 1 ? "." : ","}
                          </span>
                        );
                      })}
                  </p>
                </div>
                <span className="mb-2 text-base font-bold">Method:</span>
                <p className="mb-5 w-[400px] line-clamp-3">{method}...</p>
                <p>
                  <strong>Cooking Time: </strong>
                  {cookingTime.current?.value} minutes
                </p>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Preview;