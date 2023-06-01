import MainFooter from "@/components/common/footer/MainFooter";
import SubFooter from "@/components/common/footer/SubFooter";
import Overlay from "@/components/common/overlay/Overlay";

export default function Footer() {
  return (
    <>
      <Overlay />
      <footer className="relative z-2 flex w-full flex-col backdrop-blur-md">
        <MainFooter />
        <SubFooter />
      </footer>
    </>
  );
}
