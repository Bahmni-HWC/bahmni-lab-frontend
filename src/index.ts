/**
 * This is the entrypoint file of the application. It communicates the
 * important features of this microfrontend to the app shell. It
 * connects the app shell to the React application(s) that make up this
 * microfrontend.
 */

import {defineConfigSchema, getAsyncLifecycle} from '@openmrs/esm-framework'
import {configSchema} from './config-schema'
import {labliteModuleName, searchModuleName} from './utils/constants'

/**
 * This tells the app shell how to obtain translation files: that they
 * are JSON files in the directory `../translations` (which you should
 * see in the directory structure).
 */
const importTranslation = require.context(
  '../translations',
  false,
  /.json$/,
  'lazy',
)

/**
 * This tells the app shell what versions of what OpenMRS backend modules
 * are expected. Warnings will appear if suitable modules are not
 * installed. The keys are the part of the module name after
 * `openmrs-module-`; e.g., `openmrs-module-fhir2` becomes `fhir2`.
 */
const backendDependencies = {
  fhir2: '^1.2.0',
  'webservices.rest': '^2.2.0',
}

function setupOpenMRS() {
  defineConfigSchema(searchModuleName, configSchema)

  const options = {
    featureName: 'lab-lite',
    moduleName: labliteModuleName,
  }

  return {
    pages: [
      {
        route: /^[A-Za-z0-9-]+/,
        load: getAsyncLifecycle(
          () => import('./patient-lab-dashboard/patient-lab-root.component'),
          {
            featureName: 'patient-lab-root',
            moduleName: labliteModuleName,
          },
        ),
      },
      {
        route: /^patient-lab-dashboard\/patient-lab-details\/[A-Za-z0-9-]+/,
        load: getAsyncLifecycle(
          () =>
            import(
              './patient-lab-dashboard/patient-lab-details/patient-lab-details'
            ),
          {
            featureName: 'patient-lab-details',
            moduleName: labliteModuleName,
          },
        ),
      },
    ],
    extensions: [
      {
        name: 'home-button',
        load: getAsyncLifecycle(
          () => import('./home-button/home-button'),
          options,
        ),
        slot: 'top-nav-info-slot',
      },
    ],
  }
}

export {backendDependencies, importTranslation, setupOpenMRS}
