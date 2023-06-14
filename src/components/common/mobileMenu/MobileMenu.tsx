"use client";
import { useAppDispatch, useAppSelector, RootState } from "@/libs/store/store";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { setMobileMenuOpen } from "@/slices/mobileMenuSlice";
import MobileNavigation from "@/components/common/mobileMenu/MobileNavigation";
import CloseMobileMenu from "@/components/common/mobileMenu/CloseMobileMenu";
import FooterProjectOverview from "@/components/demo/FooterProjectOverview";
import FooterMenuGetStarted from "@/components/demo/FooterMenuGetStarted";
import FooterMenuAboutMe from "@/components/demo/FooterMenuAboutMe";
import ProjectCommand from "@/components/demo/ProjectCommand";
import FooterDocumentations from "@/components/demo/FooterDocumentations";
import DevelopedBy from "@/components/demo/DevelopedBy";

export default function MobileMenu() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const mobileMenuOpen = selector((state: RootState) => state.mobileMenu.open); // updated
  const overlayActive = selector((state: RootState) => state.overlay.active); // updated
  const [mobileMenuClass, setMobileMenuClass] = useState("translate-x-full");

  const mobileMenuClassHandler = (stateSelector) => {
    // Change the transform class for the mobile menu based on the stateSelector passed
    if (stateSelector) {
      setMobileMenuClass("translate-x-0");
    } else {
      setMobileMenuClass("translate-x-full");
    }
  };

  // Hook when the mobile menu state is changed
  useEffect(() => {
    mobileMenuClassHandler(mobileMenuOpen);
  }, [mobileMenuOpen]);

  // Hook when the overlay state is changed
  useEffect(() => {
    mobileMenuClassHandler(overlayActive);
  }, [overlayActive]);

  // Triggered every time the path changes
  useEffect(() => {
    dispatch(setMobileMenuOpen(false));
  }, [dispatch, pathname]);

  return (
    <header className={`fixed right-0 top-0 z-30 h-screen w-full bg-white text-black transition-all duration-1000 ` + mobileMenuClass}>
      <div className="flex h-full w-full flex-col">
        <div className="flex items-center justify-between border-b-2 border-bleached px-30px py-10px pb-5px">
          <div className="py-10px xl:py-20px">Logo Here</div>
          <CloseMobileMenu />
        </div>
        <div className="py-50px font-secondary lg:py-80px">
          <div className="container">
            <div className="flex w-full flex-col gap-50px mdl:gap-70px">
              <div className="grid w-full grid-cols-1 gap-50px sm:grid-cols-4 md:grid-cols-3 mdl:grid-cols-4">
                <div className="pr-20px sm:col-span-4 md:col-span-3 mdl:col-span-2">
                  <div className="flex w-full flex-col gap-25px">
                    <div className="flex max-w-full flex-col gap-20px">
                      <div className="flex max-w-full flex-col gap-5px">
                        <h4 className={`font-primary text-2xl font-semibold`}>About the Project</h4>
                        <p className="font-primary text-sm italic">Disclaimer: This a demo NextJS project for education and showcase.</p>
                      </div>
                      <p className="text-gray">
                        A simple weather application that fetches weather data from an API and displays it in a visually appealing way. Users can
                        search for weather by location, view current weather conditions, and see a forecast for the upcoming days.
                      </p>
                    </div>
                    <DevelopedBy />
                  </div>
                </div>
                <div className="sm:col-span-2 md:col-span-1">
                  <FooterMenuGetStarted />
                </div>
                <div className="sm:col-span-2 md:col-span-1">
                  <FooterMenuAboutMe />
                </div>
              </div>
              <div className="flex max-w-full flex-col gap-20px">
                <h4 className={`font-primary text-2xl font-semibold`}>Create your NextJs app</h4>
                <ProjectCommand />
              </div>
              <FooterDocumentations />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
