export const mockPendingLabOrder = {
  results: [
    {
      id: 'abc-123',
      testName: 'Routine Blood',
      date: 'May 03, 2022',
      orderedBy: 'Superman',
    },
    {
      id: 'abd-123',
      testName: 'Anaemia Panel',
      date: 'May 03, 2022',
      orderedBy: 'Superman',
    },
    {
      id: 'abe-123',
      testName: 'Dummy Test',
      date: 'May 03, 2022',
      orderedBy: 'Superman',
    },
    {
      id: 'abf-123',
      testName: 'Haemoglobin',
      date: 'May 03, 2022',
      orderedBy: 'Superman',
    },
  ],
  goTo: jest.fn(),
  currentPage: 1,
}
