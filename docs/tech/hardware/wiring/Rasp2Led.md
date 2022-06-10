[Documentation](/readme.md) › [Technical](/docs/tech.md) › [Hardware](/docs/tech/hardware.md) › [Wiring](/docs/tech/hardware/wiring.md) › Rasp2Led

# The Rasp2Led cable

Since the power is on the other side of the LEDs chain, we just have to connect four pins of the Raspberry Pi to the LEDs.

## Connectors

On the LEDs side of the cable, I used a JST-SM-4 male connector to match the female already on the LEDs stripe.

The pins on the Raspberry Pi are spread in two different spots, so I separated the Raspberry Pi side connector in two JST-XH-3.

## Schematics

| Raspberry Pi pin | JST-XH-3 pin | Wire color | JST-SM-4 pin | LED stripe pin |
| ---------------- | ------------ | ---------- | ------------ | -------------- |
| Pin #4 (5V POW)  | Conn#1 Pin#1 | Red        | Pin#1        | 5v             |
| Pin #6 (GND)     | Conn#1 Pin#2 | Black      | Pin#4        | GND            |
| Pin #19 (MOSI)   | Conn#2 Pin#3 | Green      | Pin#3        | Data IN        |
| Pin #23 (SCLK)   | Conn#2 Pin#1 | Blue       | Pin#2        | Clock IN       |

To avoid confusion between the two JST-XH-3 connector, I coloured the second one in blue.a

## How to do it

There is no soldering needed, I just used a JST crimping tool.
