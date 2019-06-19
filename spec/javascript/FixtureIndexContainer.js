import fetchMock from 'fetch-mock'
import FixtureIndexContainer from '../../app/javascript/react/containers/FixtureIndexContainer';
import jasmineEnzyme from 'jasmine-enzyme'
import { mount } from 'enzyme'

describe('FixtureIndexContainer', () => {
  let wrapper;
  let response;
  let params;

  beforeEach(() => {
    response = {
      manufacturers: [
        {
          id: 66,
          name: "5star-systems",
          fixtures: [
            {
              id: 246,
              name: "Spica 250M",
              short_name: "Spica250M",
              manual: "http://www.ghl.be/?wpfb_dl=134",
              weight: 18,
              wattage: 500,
              mode_list: {
                "8bit": 14,
                "16bit": 16
              },
              creator: "OFL",
              favorite: false
            }
          ]
        },
        {
          id: 2,
          name: "abstract",
          fixtures: [
            {
              id: 2,
              name: "Twister 4",
              short_name: "Twister4",
              manual: "http://www.sabretechnology.co.uk/pdfs/allman2.pdf",
              weight: 5,
              wattage: 250,
              mode_list: {
                "HP (3ch)": 3,
                "1 CE (2ch)": 2
              },
              creator: "OFL",
              favorite: false
            }
          ]
        }
      ],
      user_id: 1,
      user_fixtures: [
        {
          id: 292,
          name: "VL 4000 Spot",
          short_name: "VL4000Spot",
          manual: "https://www.vari-lite.com/b-dam/vari-lite/products/vl4000-spot/guides-and-manuals/VariLite_VL4000_Spot_UserManual.pdf",
          weight: 90.1,
          wattage: 1200,
          mode_list: {
            Standard: 52,
            Enhanced: 57
          },
          creator: "mike",
          favorite: true,
          instrument_count: 0,
          show_names: [ ],
          modes: [
            {
              id: 1266,
              name: "Standard",
              short_name: "Standard",
              footprint: 52
            },
            {
              id: 1265,
              name: "Enhanced",
              short_name: "Enhanced",
              footprint: 57
            }
          ]
        },
        {
          id: 270,
          name: "VL1100",
          short_name: "VL1100",
          manual: "",
          weight: 0,
          wattage: null,
          mode_list: {
            default: 23
          },
          creator: "mike",
          favorite: true,
          instrument_count: 10,
          show_names: [
            "Carmen",
            "Sam's Bar Mitzvah",
            "World Series"
          ],
          modes: [
            {
              id: 1216,
              name: "default",
              short_name: "default",
              footprint: 23
            }
          ]
        }
      ]
    }

    fetchMock.get(`/api/v1/fixtures`, {
      status: 200,
      body: response
    });

    wrapper = mount(
      <FixtureIndexContainer/>
    )
  })

  afterEach(fetchMock.restore)

  it('should render a list of manufacturers', (done) => {
    setTimeout(() => {
      expect(true).toBe(true)
      console.log(wrapper.debug())
      expect(wrapper.text()).toContain("Loraine Hill Park")
      expect(wrapper.text()).toContain("Boston Common")
      done()
    }, 0);
  });


});
