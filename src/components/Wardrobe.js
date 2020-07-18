import React, {useState, useCallback } from 'react'
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { Shirts } from "./Shirts";
import { TShirts } from "./TShirts";

export default function Wardrobe() {
    
const [currentImage, setCurrentImage] = useState(0);
const [viewerIsOpen, setViewerIsOpen] = useState(false);

const openLightbox = useCallback((event, { photo, index }) => {
  setCurrentImage(index);
  setViewerIsOpen(true);
}, []);

const closeLightbox = () => {
  setCurrentImage(0);
  setViewerIsOpen(false);
};
    return (
      <div className="area-2">
        <h1>T-Shirts</h1>
      <div className="area-1">  
        <Gallery photos={TShirts} onClick={openLightbox} />
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={TShirts.map(x => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>
        </div>        
        <h1>Shirts</h1>
        <div className="area-1">
        <Gallery photos={Shirts} onClick={openLightbox} />
            <ModalGateway>
              {viewerIsOpen ? (
                <Modal onClose={closeLightbox}>
                  <Carousel
                    currentIndex={currentImage}
                    views={Shirts.map(x => ({
                      ...x,
                      srcset: x.srcSet,
                      caption: x.title
                    }))}
                  />
                </Modal>
              ) : null}
            </ModalGateway>
    </div>
    <h1></h1>
        </div>
    )
}