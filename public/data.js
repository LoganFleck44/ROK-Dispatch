/* ============================================================
   ROK Dispatch — data layer (localStorage-backed)
   ============================================================ */
(function () {
  const STORAGE_KEY = 'rok-dispatch-data-v1';

  const LOAD_STATUSES = ['Quote', 'Booked', 'Covered', 'In Transit', 'Delivered', 'Invoiced', 'Paid'];
  const STOP_STATUSES = ['Queued', 'Arrived', 'Loaded', 'Departed', 'Completed'];
  const TRAILER_TYPES = ['Van', 'Reefer', 'Flatbed', 'Step Deck', 'Straight Truck', 'Container'];
  const CAPACITIES = ['Truckload (TL)', 'Less Than Truckload (LTL)', 'Partial'];
  const ATTRIBUTES = ['Air Ride', 'B-Train', 'Blanket Wrap', 'Chains', 'Hazmat', 'Insulated', 'Tarps', 'Vented', 'Tri-Axle', 'Team', 'Tailgate', 'Frozen', 'Heat', 'Expedite', 'Inbond', 'Over-Dimensional', 'Forklift', 'Inside Delivery', 'Ramps'];
  const PACKAGING_TYPES = ['skid', 'pallet', 'box', 'crate', 'drum', 'bundle', 'roll', 'tote', 'piece'];

  const CUSTOMERS = [
    { id: '001141', name: 'BRC Group', address1: '24 Armstrong Avenue', address2: "Door #'s 8", city: 'Georgetown', prov: 'Ontario', postal: 'L7G4R9', contact: 'ROK Shipping', email: '', phone: '(905) 820-6710', ext: '', terms: 'Net 30', active: true },
    { id: '001094', name: 'SPEC Furniture', address1: '500 Hopkins Street', address2: '', city: 'Mississauga', prov: 'Ontario', postal: 'L5B3C9', contact: 'Shipping Desk', email: '', phone: '(905) 246-5550', ext: '', terms: 'Net 30', active: true },
    { id: '001077', name: 'Allseating', address1: '5800 Avebury Rd', address2: '', city: 'Mississauga', prov: 'Ontario', postal: 'L5R3M3', contact: 'Dock Office', email: '', phone: '(905) 502-7200', ext: '', terms: 'Net 45', active: true },
    { id: '01-0543', name: 'Midwest OFC Furniture & Supply', address1: '2020 Industrial Blvd', address2: '', city: 'Salt Lake City', prov: 'Utah', postal: '84104', contact: 'Steve Stalks', email: '', phone: '(801) 359-7681', ext: '239', terms: 'Net 30', active: true },
    { id: '01-1097', name: 'Perdue Office Interiors', address1: '4763 Philips Hwy', address2: '', city: 'Jacksonville', prov: 'Florida', postal: '32207', contact: 'Pete Schirmer', email: '', phone: '(904) 807-5714', ext: '', terms: 'Net 30', active: true },
    { id: '01-1144', name: 'Bobel`s Office Plus', address1: '910 Cleveland Ave', address2: '', city: 'Amherst', prov: 'Ohio', postal: '44001', contact: 'Receiving Receiving', email: '', phone: '(440) 960-7070', ext: '', terms: 'Net 30', active: true },
    { id: '01-4633', name: 'Scott Rice', address1: '10201 W 87th St', address2: '', city: 'Lenexa', prov: 'Kansas', postal: '66212', contact: 'Rick Calandrino', email: '', phone: '(913) 227-7730', ext: '', terms: 'Net 30', active: true },
    { id: '01-500', name: 'Scott Rice-Oklahoma City', address1: '900 N Broadway Ave', address2: '', city: 'Oklahoma', prov: 'Oklahoma', postal: '73102', contact: 'Mark Pickard', email: '', phone: '(405) 842-8883', ext: '', terms: 'Net 30', active: true },
    { id: '01-771', name: '1 WILSON OFFICE INTERIORS', address1: '1301 Young St', address2: '', city: 'DALLAS', prov: 'Texas', postal: '75202', contact: 'SEAN SKEEN', email: '', phone: '(972) 488-4121', ext: '', terms: 'Net 30', active: true },
    { id: '01-772', name: '1 Wilson Office Interiors', address1: '1301 Young St', address2: '', city: 'Dallas', prov: 'Texas', postal: '75202', contact: 'Mauro Tijerina', email: '', phone: '(214) 701-2244', ext: '', terms: 'Net 30', active: true },
    { id: '01-802', name: '10 MSG / LGC', address1: '135 Vandenberg St', address2: '', city: 'Colorado Springs', prov: 'Colorado', postal: '80914', contact: 'Caroline Grams', email: '', phone: '(719) 333-0809', ext: '', terms: 'Net 30', active: true },
    { id: '01-810', name: '111', address1: '1200 Superior Ave', address2: '', city: 'CLEVELAND', prov: 'Ohio', postal: '44114', contact: 'Receiving Receiving', email: '', phone: '', ext: '', terms: 'Net 30', active: true },
    { id: '01-816', name: '116th MI GP Parker Jason GCL', address1: 'Bldg 21715, 4th Ave', address2: '', city: 'Fort Gordon', prov: 'Georgia', postal: '30905', contact: 'Receiving Receiving', email: '', phone: '(706) 791-7629', ext: '', terms: 'Net 30', active: true },
    { id: '01-818', name: '118 AWLGR', address1: '240 Knapp Blvd', address2: '', city: 'Nashville', prov: 'Tennessee', postal: '37217', contact: 'Receiving Receiving', email: '', phone: '(615) 313-2625', ext: '', terms: 'Net 30', active: true },
    { id: '01-823', name: '11th Airborn Division Road', address1: 'Bldg 4, Division Rd', address2: '', city: 'Fort Benning', prov: 'Georgia', postal: '31905', contact: 'Receiving Receiving', email: '', phone: '(706) 333-1240', ext: '', terms: 'Net 30', active: true },
    { id: '01-830', name: '12 J.M.C. Forwarding Interamerica', address1: '11602 Sara Rd', address2: '', city: 'Laredo', prov: 'Texas', postal: '78045', contact: 'Marissa De Luna', email: '', phone: '(956) 791-5400', ext: '', terms: 'Net 30', active: true },
    { id: '01-839', name: '139 Airlift Wing', address1: '705 Memorial Dr', address2: '', city: 'Saint Joseph', prov: 'Missouri', postal: '64503', contact: 'Michael Yuille', email: '', phone: '(816) 236-3529', ext: '', terms: 'Net 30', active: true },
    { id: '01-845', name: '14 FTW MAQ', address1: '555 Seventh St', address2: '', city: 'Columbus AFB', prov: 'Mississippi', postal: '39710', contact: 'Receiving Receiving', email: '', phone: '(662) 434-2653', ext: '', terms: 'Net 30', active: true },
  ];

  const CARRIERS = [
    { id: '000773', name: 'MANGAT TRANSHAUL INC.', contact: 'Dispatch Dispatch', phone: '(905) 216-2772', ext: '', address1: '10 APPLEBY DRIVE', city: 'BRAMPTON', prov: 'Ontario', postal: 'L6T2S6', terms: 'Net 30', active: true, preferred: true, vans: 4, reefers: 0, flatbeds: 0 },
    { id: '000541', name: 'GTA EXPRESS FREIGHT', contact: 'Dispatch Dispatch', phone: '(416) 555-0142', ext: '', address1: '77 Steeles Ave E', city: 'Toronto', prov: 'Ontario', postal: 'M2M3Y8', terms: 'Net 30', active: true, preferred: false, vans: 2, reefers: 1, flatbeds: 0 },
    { id: '000388', name: 'NORTHSTAR CARRIERS LTD.', contact: 'Dispatch Dispatch', phone: '(905) 555-0177', ext: '', address1: '211 Queen St', city: 'Milton', prov: 'Ontario', postal: 'L9T1M4', terms: 'Net 45', active: true, preferred: false, vans: 3, reefers: 0, flatbeds: 2 },
    { id: '000801', name: 'Noram Freight Services', contact: 'Dispatch Dispatch', phone: '(408) 772-4131', ext: '', address1: '', city: 'Edmonton', prov: 'Alberta', postal: '', terms: 'Net 30', active: true, preferred: false, vans: 0, reefers: 0, flatbeds: 0 },
    { id: '000802', name: '1st Line logistics', contact: 'Dispatch Dispatch', phone: '(905) 768-2940', ext: '', address1: '', city: 'Hagersville', prov: 'Ontario', postal: '', terms: 'Net 30', active: true, preferred: false, vans: 0, reefers: 0, flatbeds: 0 },
    { id: '000803', name: '2 XS Inc.', contact: 'Dispatch Dispatch', phone: '(412) 521-3512', ext: '', address1: '', city: 'Pittsburgh', prov: 'Pennsylvania', postal: '', terms: 'Net 30', active: true, preferred: false, vans: 0, reefers: 0, flatbeds: 0 },
    { id: '000804', name: '2172058 ALBERTA LTD.', contact: 'Dispatch Dispatch', phone: '(226) 250-1280', ext: '', address1: '', city: 'CALGARY', prov: 'Alberta', postal: '', terms: 'Net 30', active: true, preferred: false, vans: 0, reefers: 0, flatbeds: 0 },
    { id: '000805', name: '4 J Logistics Inc', contact: 'Dispatch Dispatch', phone: '(905) 794-4653', ext: '', address1: '', city: 'Halifax', prov: 'NovaScotia', postal: '', terms: 'Net 30', active: true, preferred: false, vans: 0, reefers: 0, flatbeds: 0 },
    { id: '000806', name: '4 Star Courier & Logistics', contact: 'Dispatch Dispatch', phone: '(905) 673-3333', ext: '', address1: '', city: 'Mississauga', prov: 'Ontario', postal: '', terms: 'Net 30', active: true, preferred: false, vans: 0, reefers: 0, flatbeds: 0 },
    { id: '000807', name: '4D Transportation', contact: 'Dispatch Dispatch', phone: '(770) 788-4025', ext: '', address1: '', city: 'Acworth', prov: 'Georgia', postal: '', terms: 'Net 30', active: true, preferred: false, vans: 0, reefers: 0, flatbeds: 0 },
    { id: '000808', name: '4P, INC', contact: 'Dispatch Dispatch', phone: '(773) 971-2889', ext: '', address1: '', city: 'CHICAGO', prov: 'Illinois', postal: '', terms: 'Net 30', active: true, preferred: false, vans: 0, reefers: 0, flatbeds: 0 },
    { id: '000809', name: '6407692 Canada Inc.', contact: 'Dispatch Dispatch', phone: '(705) 737-4815', ext: '', address1: '', city: 'Barrie', prov: 'Ontario', postal: '', terms: 'Net 30', active: true, preferred: false, vans: 0, reefers: 0, flatbeds: 0 },
    { id: '000810', name: '911 Roadside', contact: 'Dispatch Dispatch', phone: '(289) 553-6332', ext: '', address1: '', city: 'Maple', prov: 'Ontario', postal: '', terms: 'Net 30', active: true, preferred: false, vans: 0, reefers: 0, flatbeds: 0 },
    { id: '000811', name: 'A & M International', contact: 'Dispatch Dispatch', phone: '(819) 832-4936', ext: '', address1: '', city: 'East Angus', prov: 'Quebec', postal: '', terms: 'Net 30', active: true, preferred: false, vans: 0, reefers: 0, flatbeds: 0 },
    { id: '000812', name: 'A-Way Transportation', contact: 'Dispatch Dispatch', phone: '(204) 777-5423', ext: '', address1: '', city: 'Winnipeg', prov: 'Manitoba', postal: '', terms: 'Net 30', active: true, preferred: false, vans: 0, reefers: 0, flatbeds: 0 },
    { id: '000813', name: 'A.B.P. TRANSPORT', contact: 'Dispatch Dispatch', phone: '(416) 309-9198', ext: '', address1: '', city: 'BRAMPTON', prov: 'Ontario', postal: '', terms: 'Net 30', active: true, preferred: false, vans: 0, reefers: 0, flatbeds: 0 },
    { id: '000814', name: 'A.C. Logistics Ltd.', contact: 'Dispatch Dispatch', phone: '(416) 722-8564', ext: '', address1: '', city: 'Newmarket', prov: 'Ontario', postal: '', terms: 'Net 30', active: true, preferred: false, vans: 0, reefers: 0, flatbeds: 0 },
    { id: '000815', name: 'A.J.L. Logistical Inc.', contact: 'Dispatch Dispatch', phone: '(905) 848-8795', ext: '', address1: '', city: 'Mississauga', prov: 'Ontario', postal: '', terms: 'Net 30', active: true, preferred: false, vans: 0, reefers: 0, flatbeds: 0 },
  ];

  const BROKERS = [
    { name: 'Affiliated Customs Brokers Limited', loadsRun: 0, city: 'Mississauga', prov: 'Ontario', contact: 'CustomsClearance', email: '', phone: '(905) 871-1144', ext: '', active: true },
    { name: 'BCB Canada', loadsRun: 41, city: '', prov: '', contact: 'CustomsClearance', email: 'pars@bcbcanada.ca', phone: '(905) 871-1884', ext: '', active: true },
    { name: 'BCB International', loadsRun: 8, city: 'Buffalo', prov: 'NewYork', contact: 'CustomsClearance', email: '', phone: '(716) 884-1554', ext: '', active: true },
    { name: 'Cole International', loadsRun: 47, city: '', prov: '', contact: 'CustomsClearance', email: 'cassandra.weaver@coleintl.com', phone: '', ext: '', active: true },
    { name: 'CUSTOM GLOBAL LOGISTICS', loadsRun: 2, city: 'Northlake', prov: 'Illinois', contact: 'Steven', email: 'sflores@customgl.com', phone: '(708) 338-5334', ext: '', active: true },
    { name: 'DANZAS', loadsRun: 0, city: '', prov: '', contact: 'CustomsClearance', email: '', phone: '', ext: '', active: true },
    { name: 'DSV', loadsRun: 1, city: 'Buffalo', prov: 'NewYork', contact: 'Justin', email: 'Justin.Fisher@us.dsv.com', phone: '(905) 203-2020', ext: '', active: true },
    { name: 'Farrrow Group', loadsRun: 0, city: '', prov: '', contact: 'CustomsClearance', email: '', phone: '(416) 622-9327', ext: '', active: true },
    { name: 'Fed Ex Trade Network', loadsRun: 0, city: '', prov: '', contact: 'CustomsClearance', email: '', phone: '(716) 879-1075', ext: '', active: true },
    { name: 'Great Lakes', loadsRun: 0, city: '', prov: '', contact: 'CustomsClearance', email: '', phone: '(716) 297-4500', ext: '', active: true },
    { name: 'HEMISPHERE FREIGHT & BROKERAGE', loadsRun: 0, city: '', prov: '', contact: 'CustomsClearance', email: 'EMPLOYEES@HFCAN.COM', phone: '(416) 252-5661', ext: '', active: true },
    { name: 'Holistic Logistic Consulting', loadsRun: 0, city: 'Brampton', prov: 'Ontario', contact: 'CustomsClearance', email: 'cscase@roklogistics.com', phone: '(647) 261-4103', ext: '', active: true },
    { name: 'J. W. SMITH', loadsRun: 0, city: '', prov: '', contact: 'CustomsClearance', email: '', phone: '', ext: '', active: true },
    { name: 'LIVINGSTON', loadsRun: 210, city: '', prov: '', contact: 'CustomsClearance', email: '', phone: '', ext: '', active: true },
    { name: 'Livingston International Inc', loadsRun: 119, city: '', prov: '', contact: 'CustomsClearance', email: '', phone: '(905) 871-2000', ext: '', active: true },
  ];

  const SITES = {
    woodlore: { name: 'Woodlore International Inc.', contact: 'Receiving Receiving', phone: '9057919555', address1: '160 Delta Park Blvd, Dock 2-9', address2: '', city: 'Brampton', prov: 'Ontario', postal: 'L6T5T6' },
    brc: { name: 'BRC Group', contact: 'ROK Shipping', phone: '9058206710', address1: '24 Armstrong Avenue', address2: "Door #'s 8", city: 'Georgetown', prov: 'Ontario', postal: 'L7G4R9' },
    spec: { name: 'SPEC Furniture', contact: 'Shipping Desk', phone: '9052465550', address1: '500 Hopkins Street', address2: '', city: 'Mississauga', prov: 'Ontario', postal: 'L5B3C9' },
    allseating: { name: 'Allseating', contact: 'Dock Office', phone: '9055027200', address1: '5800 Avebury Rd', address2: '', city: 'Mississauga', prov: 'Ontario', postal: 'L5R3M3' },
    kitchener: { name: 'Krug Inc.', contact: 'Receiving', phone: '5195785395', address1: '111 Ahrens St W', address2: '', city: 'Kitchener', prov: 'Ontario', postal: 'N2H4C2' },
  };

  const SALES_PEOPLE = ['Tonya Littlejohn', 'Joanne MacIsaac', 'Eileen Fleck'];

  function todayAt(hour, minute) {
    const d = new Date();
    d.setHours(hour, minute || 0, 0, 0);
    return d.toISOString();
  }
  function daysFromNow(days, hour) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    d.setHours(hour || 9, 0, 0, 0);
    return d.toISOString();
  }

  function makeStop(type, site, appointmentIso, notes, milesToNext) {
    return {
      type, // 'Pickup' | 'Delivery' | 'Stop'
      appointment: appointmentIso || '',
      appointmentWindowEnd: '',
      status: 'Queued',
      site: Object.assign({}, site),
      arrival: '',
      departure: '',
      notes: notes || '',
      accessorials: [],
      milesToNext: milesToNext == null ? '' : milesToNext,
    };
  }

  function makeCommodity(desc, pcs, weight) {
    return {
      commodity: desc,
      pcs: pcs,
      type: 'skid',
      quantity: weight,
      uom: 'lb',
      unit: 'pc',
      length: 53, width: '', height: '',
      dimUom: 'ft',
      floorSpace: 0,
      totalWeight: pcs * weight,
    };
  }

  function makeCharges(freight) {
    return {
      currency: 'CAD',
      freight: freight,
      rateType: 'Flat',
      fuelSurcharge: 0,
      fuelRateType: 'Per Mile',
      accessorials: [], // {name, amount}
      discount: 0,
      applyTaxes: false,
    };
  }

  function makeLoad(opts) {
    const customer = CUSTOMERS.find(c => c.name === opts.customer) || CUSTOMERS[0];
    const carrier = opts.carrier === null ? null : (CARRIERS.find(c => c.name === opts.carrier) || CARRIERS[0]);
    return {
      loadNumber: opts.loadNumber,
      completed: !!opts.completed,
      loadStatus: opts.loadStatus || 'Quote',
      status: opts.status || 'Active',
      cancelled: false,
      highlight: !!opts.highlight, // pink board row (deliver today / hot)
      customer: Object.assign({}, customer),
      customerContact: customer.contact + '   ' + customer.phone,
      customerTerms: customer.terms,
      salesPerson: opts.salesPerson || 'Tonya Littlejohn',
      createdBy: (opts.salesPerson === 'Joanne MacIsaac' ? 'jmacisaac' : 'tlittlejohn') + '@roklogistics.com',
      orderCreatedDate: opts.created || todayAt(15, 42),
      quoteValidUntil: '',
      rateConDate: '',
      invoicedDate: '',
      deliveredDate: '',
      customerReference: opts.ref || '',
      proNumbers: opts.ref || '',
      carrier: carrier ? Object.assign({ driver: '', truck: '', trailer: '', seal: '' }, carrier) : null,
      carrierTerms: carrier ? carrier.terms : 'Net 30',
      customsBroker: '',
      quoteComments: '',
      specialInstructions: opts.instructions || '',
      stops: opts.stops || [],
      commodities: opts.commodities || [],
      trailerEquipment: 'Van',
      minCapacity: 'Truckload (TL)',
      attributes: opts.attributes || [],
      rate: {
        customer: makeCharges(opts.customerFreight != null ? opts.customerFreight : 440),
        carrier: makeCharges(opts.carrierFreight != null ? opts.carrierFreight : 350),
      },
      loadedMiles: opts.miles != null ? opts.miles : 20,
      documents: [],
      generatedDocs: [],
      notes: [],
      history: opts.history || [
        { date: opts.created || todayAt(15, 42), user: (opts.salesPerson === 'Joanne MacIsaac' ? 'jmacisaac' : 'tlittlejohn') + '@roklogistics.com', entity: 'Load', action: 'Created', changes: [{ field: 'Load', from: '', to: 'Created' }] },
      ],
    };
  }

  function seedData() {
    const loads = [];

    // 003290 — matches the detailed screenshots
    loads.push(makeLoad({
      loadNumber: '003290', loadStatus: 'Quote', customer: 'BRC Group', salesPerson: 'Tonya Littlejohn',
      ref: '3218 / 30392', highlight: true, miles: 20, customerFreight: 440, carrierFreight: 350,
      instructions: 'PICKED UP AT WOODLORE - THEN TO GEORGETOWN',
      stops: [
        makeStop('Pickup', SITES.woodlore, todayAt(23, 0), 'CLOSED AT 2 PM SHARP **NO STACKING ALL ON FLOOR**\n3218 / 30392', 20),
        makeStop('Delivery', SITES.brc, todayAt(13, 0), '** NO STACKING, NO EXCEPTIONS - ALL ON FLOOR **\nDELIVER ASAP TODAY'),
      ],
      commodities: [makeCommodity('3218 / 30392 + LOCAL TRANSFER', 15, 500)],
      history: [
        { date: todayAt(15, 42), user: 'tlittlejohn@roklogistics.com', entity: 'Load', action: 'Created', changes: [{ field: 'Load', from: '', to: 'Created' }] },
        { date: todayAt(15, 43), user: 'tlittlejohn@roklogistics.com', entity: 'Load', action: 'Updated', changes: [{ field: 'IsLoadCompleted', from: 'false', to: '' }] },
        { date: todayAt(15, 44), user: 'tlittlejohn@roklogistics.com', entity: 'CarrierCharge', action: 'Updated', changes: [
          { field: 'FreightTypeId', from: '1', to: '2' },
          { field: 'TotalFreightPlusFuel', from: '', to: '350' },
          { field: 'SubTotal', from: '', to: '350' },
          { field: 'TotalCharges', from: '', to: '350' },
        ]},
        { date: todayAt(15, 44), user: 'tlittlejohn@roklogistics.com', entity: 'RateInsight', action: 'Updated', changes: [
          { field: 'TotalPerMileFromCarrier', from: '350', to: '17.5' },
          { field: 'Variance', from: '-328', to: '4.5' },
          { field: 'TotalMargin', from: '-6560', to: '90' },
          { field: 'MarginRate', from: '-1490.91', to: '20.45' },
        ]},
        { date: todayAt(19, 31), user: 'efleck@roklogistics.com', entity: 'RateInsight', action: 'Updated', changes: [{ field: 'USD_Rate', from: '1.3889', to: '1.3824' }] },
      ],
    }));

    loads.push(makeLoad({
      loadNumber: '003289', loadStatus: 'Quote', customer: 'BRC Group', salesPerson: 'Tonya Littlejohn',
      ref: '3215 / 30388', highlight: true, miles: 18, customerFreight: 420, carrierFreight: 340,
      stops: [
        makeStop('Pickup', SITES.brc, todayAt(10, 0), '', 18),
        makeStop('Delivery', SITES.woodlore, todayAt(14, 0), ''),
      ],
      commodities: [makeCommodity('3215 / 30388 FURNITURE', 12, 480)],
    }));

    loads.push(makeLoad({
      loadNumber: '003288', loadStatus: 'Quote', customer: 'SPEC Furniture', salesPerson: 'Joanne MacIsaac',
      ref: 'SPC-88041', miles: 42, customerFreight: 610, carrierFreight: 480,
      stops: [
        makeStop('Pickup', SITES.spec, daysFromNow(1, 8), '', 42),
        makeStop('Delivery', SITES.kitchener, daysFromNow(1, 13), ''),
      ],
      commodities: [makeCommodity('SEATING - ASSEMBLED', 20, 310)],
    }));

    loads.push(makeLoad({
      loadNumber: '003287', loadStatus: 'Quote', customer: 'Allseating', salesPerson: 'Joanne MacIsaac',
      ref: 'ALS-22903', miles: 38, customerFreight: 580, carrierFreight: 455,
      stops: [
        makeStop('Pickup', SITES.allseating, daysFromNow(1, 9), '', 38),
        makeStop('Delivery', SITES.kitchener, daysFromNow(1, 15), ''),
      ],
      commodities: [makeCommodity('TASK CHAIRS', 24, 260)],
    }));

    loads.push(makeLoad({
      loadNumber: '003286', loadStatus: 'In Transit', customer: 'BRC Group', salesPerson: 'Tonya Littlejohn',
      ref: '3212 / 30371', highlight: true, carrier: 'MANGAT TRANSHAUL INC.', miles: 18, customerFreight: 430, carrierFreight: 345,
      stops: [
        makeStop('Pickup', SITES.brc, todayAt(8, 0), '', 18),
        makeStop('Delivery', SITES.woodlore, todayAt(12, 0), 'DELIVER TODAY'),
      ],
      commodities: [makeCommodity('3212 / 30371 PANELS', 10, 620)],
    }));

    loads.push(makeLoad({
      loadNumber: '003285', loadStatus: 'In Transit', customer: 'BRC Group', salesPerson: 'Tonya Littlejohn',
      ref: '3210 / 30365', carrier: 'GTA EXPRESS FREIGHT', miles: 20, customerFreight: 445, carrierFreight: 350,
      stops: [
        makeStop('Pickup', SITES.woodlore, todayAt(7, 30), '', 20),
        makeStop('Delivery', SITES.brc, todayAt(11, 30), ''),
      ],
      commodities: [makeCommodity('3210 / 30365 LOCAL TRANSFER', 14, 500)],
    }));

    const quoteRefs = ['3208 / 30360', '3207 / 30358', '3206 / 30355', '3204 / 30351', '3203 / 30349'];
    const statuses = ['Quote', 'Quote', 'In Transit', 'Quote', 'In Transit'];
    for (let i = 0; i < 5; i++) {
      loads.push(makeLoad({
        loadNumber: String(3284 - i).padStart(6, '0'),
        loadStatus: statuses[i], customer: 'BRC Group', salesPerson: 'Tonya Littlejohn',
        ref: quoteRefs[i], miles: 18, customerFreight: 425 + i * 5, carrierFreight: 340 + i * 5,
        carrier: statuses[i] === 'In Transit' ? 'NORTHSTAR CARRIERS LTD.' : 'MANGAT TRANSHAUL INC.',
        stops: [
          makeStop('Pickup', SITES.brc, daysFromNow(i % 2, 9 + i), '', 18),
          makeStop('Delivery', SITES.woodlore, daysFromNow(i % 2, 13 + i), ''),
        ],
        commodities: [makeCommodity(quoteRefs[i] + ' FREIGHT', 10 + i, 450)],
        created: daysFromNow(-1 - i, 10),
      }));
    }

    // Some finished loads for filters / accounting later
    const finished = [
      { n: '003279', s: 'Delivered' }, { n: '003278', s: 'Delivered' },
      { n: '003277', s: 'Invoiced' }, { n: '003276', s: 'Invoiced' },
      { n: '003275', s: 'Paid' }, { n: '003274', s: 'Paid' },
    ];
    finished.forEach((f, i) => {
      const ld = makeLoad({
        loadNumber: f.n, loadStatus: f.s, customer: i % 2 ? 'SPEC Furniture' : 'BRC Group',
        salesPerson: i % 2 ? 'Joanne MacIsaac' : 'Tonya Littlejohn',
        ref: '31' + (90 - i) + ' / 302' + (60 - i), completed: true,
        carrier: CARRIERS[i % 3].name, miles: 25, customerFreight: 480, carrierFreight: 380,
        stops: [
          makeStop('Pickup', i % 2 ? SITES.spec : SITES.woodlore, daysFromNow(-3 - i, 9), '', 25),
          makeStop('Delivery', i % 2 ? SITES.kitchener : SITES.brc, daysFromNow(-3 - i, 14), ''),
        ],
        commodities: [makeCommodity('FREIGHT ' + f.n, 12, 500)],
        created: daysFromNow(-5 - i, 10),
      });
      if (f.s === 'Invoiced' || f.s === 'Paid') ld.invoicedDate = daysFromNow(-2 - i, 16);
      loads.push(ld);
    });

    return {
      loads,
      customers: CUSTOMERS,
      carriers: CARRIERS,
      brokers: BROKERS,
      sites: SITES,
      alerts: seedAlerts(),
      company: seedCompany(),
      quickbooks: seedQuickbooks(),
      invoices: [],
      nextLoadNumber: 3291,
      usdRate: 1.3824,
    };
  }

  function seedAlerts() {
    const mk = (id, h, m, note) => ({
      module: 'Load', refId: id, company: 'ROK Logistics', date: todayAt(h, m),
      user: 'automation-service', noteType: 'Call', privacy: 'Private', note,
    });
    const STALE = 'Quote is stale. Move the Load Status to BOOKED or CANCELLED.';
    const UNPAID = 'Invoice is unpaid and is past due.';
    const CHECK3H = 'Check call. Pickup appointment within 3 hours. Ensure driver is assigned.';
    const CONFIRM = 'Check call. Confirm carrier arrival date/time.';
    const NEEDINV = 'Load is delivered and requires an invoice to be generated.';
    return [
      mk('003288', 14, 18, STALE),
      mk('002807', 14, 23, UNPAID),
      mk('003289', 14, 38, STALE),
      mk('003289', 14, 43, CHECK3H),
      mk('003200', 14, 43, NEEDINV),
      mk('003278', 14, 58, CONFIRM),
      mk('003279', 15, 13, CONFIRM),
      mk('003286', 15, 25, CHECK3H),
      mk('003288', 15, 25, CHECK3H),
      mk('003266', 16, 5, NEEDINV),
      mk('003276', 16, 28, NEEDINV),
      mk('003286', 16, 33, CONFIRM),
      mk('002920', 18, 25, UNPAID),
      mk('002947', 18, 50, UNPAID),
    ];
  }

  function seedCompany() {
    return {
      name: 'ROK Logistics',
      legalName: 'ROK Logistics Inc.',
      tagline: 'WE\'RE HERE TO SERVE "YOU"',
      address1: '2 Holland Court',
      address2: '',
      city: 'Brampton', prov: 'Ontario', postal: 'L6T 5G1', country: 'Canada',
      phone: '(905) 216-2700', fax: '(905) 216-2701',
      email: 'dispatch@roklogistics.com', website: 'www.roklogistics.com',
      mcNumber: 'MC-000000', dotNumber: 'DOT-0000000', cvor: 'CVOR-000000',
      accounting: {
        gstNumber: '123456789 RT0001',
        currency: 'CAD',
        defaultTerms: 'Net 30',
        invoicePrefix: '',
        nextInvoiceNumber: 3300,
        remitEmail: 'accounting@roklogistics.com',
        fiscalYearStart: 'January',
      },
      templates: {
        rateCon: 'Standard',
        invoice: 'Standard',
        bol: 'Standard',
        footerText: 'Thank you for your business.',
      },
    };
  }

  function seedQuickbooks() {
    return {
      connected: true,
      mappings: {
        freight: 'LTL-MOTOR FREIGHT',
        fuel: 'Fuel Surcharge',
        accessorial: '',
        liftgate: 'LIFT-GATE DELIVERY FEE',
        detention: 'WAITING TIME CHARGE',
        lumper: 'EXTRA',
        loadUnload: '',
        tarp: '',
        hazmat: '',
        expedited: '',
        redelivery: '',
        layover: 'After Hours',
        other: 'EXTRA',
        oversized: 'EXTRA',
      },
      taxes: {
        gst: 'GST',
        hstOn: 'HST ON',
        hstNb: 'HST NB 2016',
        hstNs: 'HST NS 2025',
        hstPe: 'HST PE 2016',
        hstNl: 'HST NL 2016',
        gstPstBc: 'GST/PST BC',
        gstPstSk: 'GST/PST SK',
        gstPstMb: 'GST/PST MB',
        gstQstQc: 'GST/QST QC - 9.975',
      },
    };
  }

  // Bring an older stored database up to the current shape without losing user data.
  function migrate(d) {
    const seed = seedData();
    if (!d.brokers) d.brokers = seed.brokers;
    if (!d.alerts) d.alerts = seed.alerts;
    if (!d.company) d.company = seed.company;
    if (!d.quickbooks) d.quickbooks = seed.quickbooks;
    if (!d.invoices) d.invoices = [];
    mergeDirectory(d.customers, seed.customers, 'id');
    mergeDirectory(d.carriers, seed.carriers, 'id');
    return d;
  }
  function mergeDirectory(existing, seeded, key) {
    seeded.forEach(s => {
      const cur = existing.find(e => e[key] === s[key]);
      if (!cur) { existing.push(s); return; }
      Object.keys(s).forEach(k => { if (cur[k] === undefined) cur[k] = s[k]; });
    });
  }

  let db = null;

  function loadDb() {
    if (db) return db;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) { db = migrate(JSON.parse(raw)); persist(); return db; }
    } catch (e) { /* fall through to reseed */ }
    db = seedData();
    persist();
    return db;
  }

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  }

  window.Store = {
    LOAD_STATUSES, STOP_STATUSES, TRAILER_TYPES, CAPACITIES, ATTRIBUTES, PACKAGING_TYPES, SALES_PEOPLE,
    db: loadDb,
    save: persist,
    reset() { localStorage.removeItem(STORAGE_KEY); db = null; loadDb(); },
    getLoads() { return loadDb().loads; },
    getLoad(num) { return loadDb().loads.find(l => l.loadNumber === num); },
    currentUser: 'efleck@roklogistics.com',
    // Customer-side total for a load (freight + fuel + accessorials - discount, + 13% tax when applied).
    loadCustomerTotal(load) {
      const ch = load.rate.customer;
      const acc = ch.accessorials.reduce((s, a) => s + (Number(a.amount) || 0), 0);
      const subtotal = (Number(ch.freight) || 0) + (Number(ch.fuelSurcharge) || 0) + acc - (Number(ch.discount) || 0);
      return subtotal + (ch.applyTaxes ? subtotal * 0.13 : 0);
    },
    // Ensure an invoice record exists for every invoiced/paid load; returns the list.
    syncInvoices() {
      const d = loadDb();
      d.loads.forEach(load => {
        if (!load.invoicedDate && load.loadStatus !== 'Invoiced' && load.loadStatus !== 'Paid') return;
        if (!load.invoicedDate) { load.invoicedDate = new Date().toISOString(); }
        let inv = d.invoices.find(i => i.loadNumber === load.loadNumber);
        if (!inv) {
          inv = {
            loadNumber: load.loadNumber,
            invoiceNo: String(parseInt(load.loadNumber, 10)),
            submitted: false,
            qbStatus: 'Not Submitted',
            qbInvoiceNo: '',
            receipts: [],
          };
          // paid loads start fully receipted
          if (load.loadStatus === 'Paid') {
            inv.receipts.push({ date: load.invoicedDate, amount: this.loadCustomerTotal(load), method: 'EFT', reference: 'Seed payment' });
          }
          d.invoices.push(inv);
        }
      });
      persist();
      return d.invoices;
    },
    invoiceBalance(inv) {
      const load = this.getLoad(inv.loadNumber);
      if (!load) return 0;
      const paid = inv.receipts.reduce((s, r) => s + (Number(r.amount) || 0), 0);
      return Math.round((this.loadCustomerTotal(load) - paid) * 100) / 100;
    },
    invoiceDueDate(inv) {
      const load = this.getLoad(inv.loadNumber);
      if (!load || !load.invoicedDate) return '';
      const days = parseInt(String(load.customerTerms || 'Net 30').replace(/\D/g, ''), 10) || 30;
      const d = new Date(load.invoicedDate);
      d.setDate(d.getDate() + days);
      return d.toISOString();
    },
    addHistory(load, entity, action, changes) {
      load.history.unshift({ date: new Date().toISOString(), user: this.currentUser, entity, action, changes });
      persist();
    },
    newLoadNumber() {
      const d = loadDb();
      const num = String(d.nextLoadNumber).padStart(6, '0');
      d.nextLoadNumber += 1;
      return num;
    },
    createLoad(p) {
      const num = this.newLoadNumber();
      const emptySite = { name: '', contact: '', phone: '', address1: '', address2: '', city: '', prov: '', postal: '' };
      const load = makeLoad({
        loadNumber: num, loadStatus: 'Quote', customer: p.customer,
        salesPerson: 'Eileen Fleck',
        ref: '', miles: 0, customerFreight: 0, carrierFreight: 0, carrier: null,
        stops: [
          makeStop('Pickup', emptySite, p.pickupDate, '', 0),
          makeStop('Delivery', emptySite, p.deliveryDate, ''),
        ],
        commodities: [],
      });
      load.stops[0].appointmentWindowEnd = p.pickupWindowEnd || '';
      load.stops[1].appointmentWindowEnd = p.deliveryWindowEnd || '';
      load.createdBy = this.currentUser;
      load.orderCreatedDate = new Date().toISOString();
      load.history = [{ date: new Date().toISOString(), user: this.currentUser, entity: 'Load', action: 'Created', changes: [{ field: 'Load', from: '', to: 'Created' }] }];
      loadDb().loads.unshift(load);
      persist();
      return load;
    },
    copyLoad(src) {
      const copy = JSON.parse(JSON.stringify(src));
      copy.loadNumber = this.newLoadNumber();
      copy.loadStatus = 'Quote';
      copy.completed = false;
      copy.cancelled = false;
      copy.status = 'Active';
      copy.orderCreatedDate = new Date().toISOString();
      copy.invoicedDate = '';
      copy.rateConDate = '';
      copy.deliveredDate = '';
      copy.createdBy = this.currentUser;
      copy.notes = [];
      copy.documents = [];
      copy.generatedDocs = [];
      copy.stops.forEach(s => { s.status = 'Queued'; s.arrival = ''; s.departure = ''; });
      copy.history = [{ date: new Date().toISOString(), user: this.currentUser, entity: 'Load', action: 'Created', changes: [{ field: 'CopiedFrom', from: '', to: src.loadNumber }] }];
      loadDb().loads.unshift(copy);
      persist();
      return copy;
    },
  };
})();
