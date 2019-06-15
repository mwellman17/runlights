# README

[![Codeship Status for mwellman17/runlights](https://app.codeship.com/projects/ddff1910-49ea-0137-9e67-324ea1cdea75/status?branch=master)](https://app.codeship.com/projects/338383)


RunLights is an organizational app for lighting professionals. The primary features include:

- A fixture library with modes, fixture weight, power consumption, and links to documentation. The Open Lighting Project's Open Fixture Library is connected as the primary source of the fixture library, but a user can also add custom fixtures to be imported into their shows.

- An instrument builder where a user can add instruments to their show. The add instruments feature is built like the Grand MA 2 patch screen. A user selects a fixture type and mode, sets the quantity, starting channel, and address, and the app auto completes the fixture patch with the appropriate offset. A user can also add position and unit number, circuit name and number, color, gobo, and accessory information.

- An editable, customizable display table. Building from the react-table library, a user can view the information for all of the instruments within their show. A user can sort by any column or columns, or select from one of two default sorts: channel or position and unit number. Every cell of the table is editable except for fixture type, and a user can navigate with the up/ down arrow keys and return key.

- A styled, opinionated PDF for either the channel hookup or instrument schedule. Rails generates a PDF using the Prawn PDF gem. It opens in a new tab and can be downloaded or shared.


# Mobile Focused Design

RunLights has a mobile focused design geared towards production electricians and lighting programmers in order to quickly and efficiently generate paperwork for a production on site and share the necessary information with the technicians who install the equipment.
