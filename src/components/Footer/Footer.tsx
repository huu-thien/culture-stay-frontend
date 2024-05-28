import Logo from '@/assets/images/culture-stay-logo.png'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import PlaceIcon from '@mui/icons-material/Place'
import EmailIcon from '@mui/icons-material/Email'
import Image from 'next/image'
const Footer = () => {
  return (
    <footer className="block bg-[#f7f7f7]">
      <div className="px-5 md:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <div className="py-16 md:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col gap-4 items-center w-full text-center pb-4">
                <a href="#" className="inline-block max-w-full">
                  <Image
                    src={Logo}
                    alt="Culture Stay Logo"
                    className="inline-block w-full"
                  />
                </a>
                <div>
                  <span>
                    <PlaceIcon sx={{ color: '#c92327', mr: 1, my: 1 }} />
                    <span className="text-[#636262]">
                      Trụ sở chính: 123 Phố Văn Hóa, Hà Nội, Việt Nam
                    </span>
                  </span>
                  <br />
                  <span>
                    <EmailIcon sx={{ color: '#fcce00', mr: 1 }} />
                    <a
                      className="text-[#636262]"
                      href="mailto:info@culturestay.com"
                    >
                      info@culturestay.com
                    </a>
                  </span>
                </div>
                <div className="flex gap-4">
                  <a
                    href="https://facebook.com/CultureStay"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookIcon sx={{ color: '#1976d2' }} />
                  </a>
                  <a
                    href="https://instagram.com/CultureStay"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon sx={{ color: '#f2106f' }} />
                  </a>
                  <a
                    href="https://twitter.com/CultureStay"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TwitterIcon sx={{ color: '#1c96e8' }} />
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center font-semibold pt-4 sm:pt-0">
                <div className="mb-4 ml-0 mr-0 lg:ml-0 lg:mr-0">
                  <div className="font-bold uppercase">Hỗ trợ</div>
                </div>
                <a
                  href="#"
                  className="py-2 font-normal text-[#636262] transition hover:text-[#302dd7]"
                >
                  Trung tâm trợ giúp
                </a>
                <a
                  href="#"
                  className="py-2 font-normal text-[#636262] transition hover:text-[#302dd7]"
                >
                  Chính sách bảo mật
                </a>
                <a
                  href="#"
                  className="py-2 font-normal text-[#636262] transition hover:text-[#302dd7]"
                >
                  Điều khoản sử dụng
                </a>
                <a
                  href="#"
                  className="py-2 font-normal text-[#636262] transition hover:text-[#302dd7]"
                >
                  Hỗ trợ khách hàng
                </a>
              </div>
              <div className="flex flex-col items-center font-semibold pt-4 sm:pt-0">
                <div className="mb-4">
                  <div className="font-bold uppercase">Khám phá</div>
                </div>
                <a
                  href="#"
                  className="py-2 font-normal text-[#636262] transition hover:text-[#302dd7]"
                >
                  Điểm đến phổ biến
                </a>
                <a
                  href="#"
                  className="py-2 font-normal text-[#636262] transition hover:text-[#302dd7]"
                >
                  Trải nghiệm văn hóa
                </a>
                <a
                  href="#"
                  className="py-2 font-normal text-[#636262] transition hover:text-[#302dd7]"
                >
                  Blog du lịch
                </a>
                <a
                  href="#"
                  className="py-2 font-normal text-[#636262] transition hover:text-[#302dd7]"
                >
                  Sự kiện và lễ hội
                </a>
              </div>
              <div className="flex flex-col items-center font-semibold pt-4 sm:pt-0">
                <div className="mb-4">
                  <div className="font-bold uppercase">Về chúng tôi</div>
                </div>
                <a
                  href="#"
                  className="py-2 font-normal text-[#636262] transition hover:text-[#302dd7]"
                >
                  Giới thiệu Culture Stay
                </a>
                <a
                  href="#"
                  className="py-2 font-normal text-[#636262] transition hover:text-[#302dd7]"
                >
                  Sứ mệnh và tầm nhìn
                </a>
                <a
                  href="#"
                  className="py-2 font-normal text-[#636262] transition hover:text-[#302dd7]"
                >
                  Cơ hội nghề nghiệp
                </a>
                <a
                  href="#"
                  className="py-2 font-normal text-[#636262] transition hover:text-[#302dd7]"
                >
                  Liên hệ
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
