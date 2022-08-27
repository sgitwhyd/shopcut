import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "../components/Button";
import { itemList, ratings, smartphone } from "../../data/Category";
import Hero from "../../public/images/item-list-hero.png";
import iconDiscountOrange from "../../public/images/iconDiscountOrange.svg";
import { AiOutlineLeft, AiOutlineShareAlt } from "react-icons/ai";
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md";
import placesData from "../../data/places.json";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import Link from "next/link";

const PlaceDetail = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [place, setPlace] = useState({});
  const router = useRouter();
  const params = router.query.slug;
  const id = params[0];

  useEffect(() => {
    setPlace(placesData.places[id - 1]);
  }, [id]);

  const onFavoritePlaceEventHandler = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="flex justify-center ">
      <div className=" flex w-full flex-col bg-item-list md:w-96 ">
        <div className="relative flex ">
          <div className="absolute top-7 flex w-full justify-between px-8">
            <Link href="/" passHref>
              <div className="z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-white bg-white opacity-75 shadow-primary backdrop-blur-sm">
                <AiOutlineLeft size={18} />
              </div>
            </Link>
            <div className="flex">
              <div
                className="z-10 mr-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-white opacity-75 shadow-primary backdrop-blur-sm"
                onClick={onFavoritePlaceEventHandler}
              >
                {isFavorite ? (
                  <MdFavorite fill="red" size={22} />
                ) : (
                  <MdOutlineFavoriteBorder size={22} />
                )}
              </div>
              <div className="z-10 flex h-10 w-10 items-center justify-center rounded-md bg-white opacity-75 shadow-primary backdrop-blur-sm">
                <AiOutlineShareAlt />
              </div>
            </div>
          </div>
          <Image
            src={Hero}
            alt="item list hero"
            className=" top-0 rounded-b-primary"
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="z-20 -mt-10 flex h-20 w-80 items-center justify-between rounded-secondary bg-white px-5 shadow-secondary">
            <div className="flex flex-col">
              <div className="flex">
                <div className="mr-2 text-ellipsis whitespace-nowrap text-base font-bold">
                  {place.name}
                </div>
                <Image src={iconDiscountOrange} alt="" />
              </div>
              <div className="text-xs font-normal text-gray-primary">
                {place.category}
              </div>
            </div>
            <div className="h-10 w-10 rounded-lg bg-primary-color opacity-10"></div>
          </div>
        </div>
        <div className="mt-5">
          <Swiper
            spaceBetween={10}
            slidesPerView={3}
            grabCursor={true}
            style={{ paddingLeft: "36px" }}
          >
            {ratings.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <div className="flex h-14 w-max cursor-grab items-center rounded-secondary bg-white px-3">
                    <div className="mr-2 h-9 w-9 rounded-lg bg-primary-color opacity-10"></div>
                    <div className="flex flex-col">
                      <div className="text-tiny font-medium text-gray-primary">
                        {item.title}
                      </div>
                      <div className="text-xs font-bold">{item.value}</div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="mt-5 flex items-center justify-center">
          <div className="w-80 border border-dashed"></div>
        </div>
        <div className="mt-5 mb-4 pl-8 text-base font-bold">Top Popular</div>
        <div className="flex flex-col items-center justify-center">
          <div className="grid grid-cols-2 flex-wrap  gap-8">
            {itemList.map((item) => {
              return (
                <div className="relative h-56" key={item.id}>
                  <Image
                    className="h-36 w-36 rounded-lg"
                    src={item.photo}
                    alt={item.name}
                  />
                  <div className="mt-3 mb-6 text-xs font-normal">
                    {item.name}
                  </div>

                  <div className="absolute bottom-0 flex w-full items-center justify-between">
                    {item.isAvailable ? (
                      <div className="text-sm font-bold text-price">
                        {item.price}
                      </div>
                    ) : (
                      <div className="text-sm font-bold text-out-of-stock">
                        Out of stock
                      </div>
                    )}
                    <Button isAvailable={item.isAvailable} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="my-5 flex items-center justify-center">
            <div className="w-80 border border-dashed"></div>
          </div>
        </div>
        <div className="mb-4 pl-8 text-base font-bold">Smart Phone</div>
        <div className="flex flex-col items-center justify-center gap-4">
          {smartphone.map((phoneItem) => {
            return (
              <div
                className="relative flex w-80 items-center"
                key={phoneItem.id}
              >
                <div className="relative h-20 w-20">
                  {phoneItem.discount.isDiscount ? (
                    <div className="absolute -left-1 top-4 z-10 rounded-sm bg-orange py-[2px] px-2 text-tinyXs font-bold text-white">
                      Promo
                    </div>
                  ) : (
                    ""
                  )}
                  <Image
                    src={phoneItem.photo}
                    className=" absolute rounded-lg"
                    alt=""
                  />
                </div>
                <div className="mx-4 flex flex-col">
                  <div className="mb-[15%] w-36 text-xs font-normal">
                    {phoneItem.tilte}
                  </div>
                  <div className="">
                    {phoneItem.isAvailable ? (
                      <div className="flex w-fit items-center justify-center">
                        <div className="mr-1 text-sm font-bold text-price">
                          $ {phoneItem.price}
                        </div>
                        {phoneItem.discount.isDiscount ? (
                          <div className="text-xs font-normal text-inactive-text line-through">
                            $ {phoneItem.discount.discountPrice}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      <div className="text-sm font-bold text-out-of-stock">
                        Out of stock
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute right-0 bottom-2 flex w-14 items-center justify-between">
                  {/* <a
                  href="#"
                  className={`pointer-events-none flex h-5 w-5
                      items-center justify-center rounded-md border border-primary-color
                      text-tiny font-normal text-primary-color `}
                >
                  -
                </a>
                <div className="text-xs font-bold">5</div>
                <a
                  href="#"
                  className={`pointer-events-none flex h-5 w-5
                      items-center justify-center rounded-tiny border
                   border-primary-color text-tiny font-normal text-primary-color `}
                >
                  +
                </a> */}
                  <Button isAvailable={phoneItem.isAvailable} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="my-5 flex items-center justify-center">
          <div className="w-80 border border-dashed"></div>
        </div>
        <div className="mb-4 pl-8 text-base font-bold">Video Game</div>
      </div>
    </div>
  );
};

export default PlaceDetail;