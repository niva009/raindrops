'use client';

import { useState } from 'react';
import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import { useTranslation } from 'src/app/i18n/client';
import { useModalAction } from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import cn from 'classnames';
import axios from 'axios';

interface LoginFormProps {
  lang: string;
  isPopup?: boolean;
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  lang,
  isPopup = true,
  className,
}) => {
  const { t } = useTranslation(lang);
  const { closeModal } = useModalAction();
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isButtonGreen, setIsButtonGreen] = useState(false);

  // Handle OTP input change
  function handleOtpChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const value = e.target.value;
    if (value === '' || /^[0-9]$/.test(value)) {
      const newOtp = otp.substring(0, index) + value + otp.substring(index + 1);
      setOtp(newOtp);

      // Check if all OTP fields are filled
      if (newOtp.length === 6) {
        setIsButtonGreen(true);
      } else {
        setIsButtonGreen(false);
      }

      // Automatically move to the next field when a digit is entered
      if (value !== '') {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) {
          (nextInput as HTMLInputElement).focus();
        }
      }
    }
  }

  // Submit OTP for verification
  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/verify-otp`, {
        phone_number: phone,
        otp: otp,
      });

      console.log("verify otp", response);

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        closeModal();
        
      }
    } catch (error) {
      console.log("Error verifying OTP", error);
    }
  };

  // Send OTP to the phone number
  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/send-otp`, {
        phone_number: phone,
      });

      if (response.status === 200) {
        console.log("OTP sent successfully");
        setIsOtpVisible(true);
      }
    } catch (error) {
      console.log("Error sending OTP", error);
      setIsOtpVisible(false);
    }
  };

  return (
    <div
      className={cn(
        'w-half md:w-[720px] lg:w-[500px] xl:w-[500px] 2xl:w-[500px] relative',
        className
      )}
    >
      {isPopup && <CloseButton onClick={closeModal} />}

      <div className="flex mx-auto overflow-hidden rounded-lg bg-brand-light">
        <div className="w-full md py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 rounded-md flex flex-col justify-center">
          <div className="mb-6 text-center">
            <h4 className="text-xl font-semibold text-brand-dark sm:text-2xl sm:pt-3 ">
              Login / Register
            </h4>
          </div>

          {/* Phone Number Section */}
          {!isOtpVisible ? (
            <>
              <div className="mb-4">
                <Input
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  required
                  style={{ color: 'black' }}
                />
              </div>

              <Button onClick={handleSubmit} style={{ backgroundColor: "#28837a" }} disabled={false}>
                {t('common:continue')}
              </Button>
            </>
          ) : (
            <>
              {/* OTP Section */}
              <div className="mb-4 flex justify-between">
                {Array.from({ length: 6 }).map((_, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength={1}
                    value={otp[index] || ''}
                    onChange={(e) => handleOtpChange(e, index)}
                    className="w-12 h-12 text-center border rounded-md focus:outline-none"
                    style={{
                      fontSize: '20px',
                      borderColor: '#ddd',
                      backgroundColor: '#f7f7f7',
                    }}
                  />
                ))}
              </div>

              {/* Verify Button */}
              <Button
                onClick={handleOtpSubmit}
                disabled={!isButtonGreen}
                style={{ backgroundColor: isButtonGreen ? '#28837a' : '' }}
              >
                {t('common:verify')}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
