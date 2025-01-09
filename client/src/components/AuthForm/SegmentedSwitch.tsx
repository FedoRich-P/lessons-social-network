// import { FC, useState } from 'react';
//
// type SegmentedSwitchOptionProps = {
//   title: string;
//   isActive: boolean;
//   onClick: () => void;
// };
//
// export const SegmentedSwitchOption: FC<SegmentedSwitchOptionProps> = ({ title, isActive, onClick }) => {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       style={{
//         fontWeight: isActive ? 'bold' : 'normal',
//         color: isActive ? 'blue' : 'black',
//         borderBottom: isActive ? '2px solid blue' : 'none',
//         padding: '8px 16px',
//         cursor: 'pointer',
//       }}
//     >
//       {title}
//     </button>
//   );
// };
//
// type SegmentedSwitchProps = {
//   children: React.ReactNode;
// };
//
// export const SegmentedSwitch: FC<SegmentedSwitchProps> = ({ children }) => {
//   return <div style={{ display: 'flex', gap: '8px' }}>{children}</div>;
// };
