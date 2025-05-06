'use client';

import Dropdown from './Dropdown';
import Hero from './Hero';

export default function Page() {
  return (
    <>
      <Dropdown /> {/* Fixed sidebar */}
      <div className="ml-[280px] flex flex-col"> {/* Push content right if sidebar open */}
        <Hero />
        {/* Add other content here */}
      </div>
    </>
  );
}
