import React from 'react';
import { DeskTable } from '../items/DeskTable';
import { LaptopItem } from '../items/LaptopItem';
import { TabletItem } from '../items/TabletItem';
import { PrinterItem } from '../items/PrinterItem';
import { PhoneItem } from '../items/PhoneItem';
import { CatItem } from '../items/CatItem';
import { LampItem } from '../items/LampItem';
import { MugItem } from '../items/MugItem';
import { DiaryItem } from '../items/DiaryItem';
import { BusinessCardItem } from '../items/BusinessCardItem';
import { PlantItem } from '../items/PlantItem';
import { ZoroItem } from '../items/ZoroItem';
import { LuffyItem } from '../items/LuffyItem';
import { SpeakerItem } from '../items/SpeakerItem';
import { RecordItem } from '../items/RecordItem';
import { GlassesItem } from '../items/GlassesItem';
import { PhotoItem } from '../items/PhotoItem';
import { ParcelItem } from '../items/ParcelItem';
import { ShadowPad, DeskFloorShadow } from './DeskShadows';
import { DeskLighting } from './DeskLighting';
import { DeskCamera } from './DeskCamera';
import { DESK_LAYOUT } from './DeskLayout';

export const DeskScene: React.FC = () => {
  return (
    <>
      <DeskLighting />
      <DeskCamera />

      {/* Main Desk World Hierarchy */}
      <group position={[0, 0, 0]}>
        {/* Oak Table & Structure */}
        <DeskTable />

        {/* Elevated Desk Items (Y +0.012 on desk surface) */}
        <group position={[0, 0.012, 0]}>
          <LaptopItem
            position={DESK_LAYOUT.laptop.position}
            rotY={DESK_LAYOUT.laptop.rotY}
          />
          <TabletItem
            position={DESK_LAYOUT.tablet.position}
            rotY={DESK_LAYOUT.tablet.rotY}
          />
          <PrinterItem
            position={DESK_LAYOUT.printer.position}
            rotY={DESK_LAYOUT.printer.rotY}
          />
          <PhoneItem
            position={DESK_LAYOUT.phone.position}
            rotY={DESK_LAYOUT.phone.rotY}
          />
          <DiaryItem
            position={DESK_LAYOUT.notebook.position}
            rotY={DESK_LAYOUT.notebook.rotY}
          />
          <CatItem
            position={DESK_LAYOUT.cat.position}
            rotY={DESK_LAYOUT.cat.rotY}
            size={DESK_LAYOUT.cat.size}
          />
          <BusinessCardItem
            position={DESK_LAYOUT.cards.position}
            rotY={DESK_LAYOUT.cards.rotY}
          />
          <LampItem
            base={DESK_LAYOUT.lamp.base}
            target={DESK_LAYOUT.lamp.target}
          />
          <MugItem position={DESK_LAYOUT.mug.position} />
          <PhotoItem
            position={DESK_LAYOUT.photo.position}
            rotY={DESK_LAYOUT.photo.rotY}
            scale={DESK_LAYOUT.photo.scale}
          />
          <PlantItem position={DESK_LAYOUT.plant.position} />
          <GlassesItem
            position={DESK_LAYOUT.glasses.position}
            rotY={DESK_LAYOUT.glasses.rotY}
          />
          <SpeakerItem position={DESK_LAYOUT.speaker.position} />
          <RecordItem
            position={DESK_LAYOUT.record.position}
            rotY={DESK_LAYOUT.record.rotY}
            scale={DESK_LAYOUT.record.scale}
          />
          <ZoroItem
            position={DESK_LAYOUT.zoro.position}
            rotY={DESK_LAYOUT.zoro.rotY}
          />
          <LuffyItem
            position={DESK_LAYOUT.luffy.position}
            rotY={DESK_LAYOUT.luffy.rotY}
          />
          <ParcelItem
            position={DESK_LAYOUT.parcel.position}
            rotY={DESK_LAYOUT.parcel.rotY}
            scale={DESK_LAYOUT.parcel.scale}
          />

          {/* Contact Shadow Pads Beneath Objects */}
          <ShadowPad
            w={3.1}
            d={2.2}
            opacity={0.42}
            position={DESK_LAYOUT.laptop.position}
            rotY={DESK_LAYOUT.laptop.rotY}
          />
          <ShadowPad
            w={1.3}
            d={1.4}
            opacity={0.5}
            position={DESK_LAYOUT.printer.position}
            rotY={DESK_LAYOUT.printer.rotY}
          />
          <ShadowPad
            w={1.2}
            d={1.0}
            opacity={0.38}
            position={DESK_LAYOUT.tablet.position}
            rotY={DESK_LAYOUT.tablet.rotY}
          />
          <ShadowPad
            w={0.95}
            d={1.0}
            opacity={0.38}
            position={DESK_LAYOUT.phone.position}
            rotY={DESK_LAYOUT.phone.rotY}
          />
          <ShadowPad
            w={0.9}
            d={0.9}
            opacity={0.35}
            position={DESK_LAYOUT.mug.position}
          />
          <ShadowPad
            w={1.15}
            d={1.15}
            opacity={0.35}
            position={DESK_LAYOUT.plant.position}
          />
          <ShadowPad
            w={1.55}
            d={2.15}
            opacity={0.4}
            position={DESK_LAYOUT.notebook.position}
            rotY={DESK_LAYOUT.notebook.rotY}
          />
          <ShadowPad
            w={1.15}
            d={0.5}
            opacity={0.32}
            position={DESK_LAYOUT.cards.position}
            rotY={DESK_LAYOUT.cards.rotY}
          />
          <ShadowPad
            w={2.0}
            d={1.1}
            opacity={0.3}
            position={DESK_LAYOUT.cat.position}
            rotY={DESK_LAYOUT.cat.rotY}
          />
          <ShadowPad
            w={0.6}
            d={0.55}
            opacity={0.3}
            position={DESK_LAYOUT.zoro.position}
          />
          <ShadowPad
            w={1.2}
            d={0.4}
            opacity={0.28}
            position={DESK_LAYOUT.glasses.position}
            rotY={DESK_LAYOUT.glasses.rotY}
          />
          <ShadowPad
            w={0.9}
            d={0.9}
            opacity={0.36}
            position={DESK_LAYOUT.speaker.position}
          />
        </group>

        {/* Soft Floor Shadow Under Desk Legs */}
        <DeskFloorShadow />
      </group>
    </>
  );
};
