export const credentials = {
  email:    'applicant@example.com',
  password: 'Password123!',
} as const

export const loginErrors = {
  emailRequired:      'Email is required.',
  emailInvalid:       'Enter a valid email address.',
  passwordRequired:   'Password is required.',
  invalidCredentials: 'Invalid email or password.',
} as const

export const projectErrors = {
  nameRequired:         'Project name is required.',
  jurisdictionRequired: 'Jurisdiction is required.',
  addressRequired:      'Address line is required.',
  duplicateName:        'Project name already exists.',
} as const

export const seededProjects = {
  garageAddition:   'Garage Addition',
  retailRenovation: 'Retail Renovation',
  siteImprovement:  'Site Improvement',
} as const

export const jurisdictions = {
  sampleCity:    'Sample City',
  exampleCounty: 'Example County',
  demoTownship:  'Demo Township',
} as const
