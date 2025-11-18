import { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-8">
      <div className="relative">
        {/* Phone Frame */}
        <div className="relative bg-black rounded-[60px] p-3 shadow-2xl">
          {/* Screen Container */}
          <div className="relative bg-white rounded-[48px] overflow-hidden" style={{ width: '393px', height: '852px' }}>
            {/* Dynamic Island */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50">
              <div className="bg-black rounded-b-[20px] w-[126px] h-[37px]" />
            </div>
            
            {/* App Content */}
            <div className="w-full h-full overflow-y-auto overflow-x-hidden relative">
              {children}
            </div>
          </div>
          
          {/* Power Button */}
          <div className="absolute right-0 top-[200px] w-1 h-16 bg-gray-800 rounded-l" />
          
          {/* Volume Buttons */}
          <div className="absolute left-0 top-[180px] w-1 h-12 bg-gray-800 rounded-r" />
          <div className="absolute left-0 top-[240px] w-1 h-12 bg-gray-800 rounded-r" />
        </div>

        {/* Phone Shadow */}
        <div className="absolute inset-0 rounded-[60px] shadow-xl pointer-events-none" />
      </div>
    </div>
  );
}
