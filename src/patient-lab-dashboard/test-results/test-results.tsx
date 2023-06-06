import {
  Button,
  DatePicker,
  DatePickerInput,
  TextArea,
  TextInput,
} from 'carbon-components-react'
import dayjs from 'dayjs'
import React, {useState} from 'react'
import useSWR from 'swr'
import Overlay from '../../common/overlay'
import {usePendingLabOrderContext} from '../../context/pending-orders-context'
import {
  useDoctorDetails,
  useSelectedTests,
} from '../../context/upload-report-context'
import styles from './test-results.scss'
import {fetcher, getTestResults, swrOptions} from '../../utils/api-utils'
import {getTestName} from '../../utils/helperFunctions'
import DoctorListDropdown from '../doctors-list-dropdown/doctor-list-dropdown'
import {saveTestDiagnosticReport} from '../upload-report/upload-report.resources'
import {Datatype, TestResultsLabOrder} from '../../types'

interface TestResultProps {
  saveHandler: Function
  closeHandler: Function
  header: string
  patientUuid: string
}

const TestResults: React.FC<TestResultProps> = ({
  saveHandler,
  closeHandler,
  header,
  patientUuid,
}) => {
  const locale: Object = localStorage.getItem('i18nextLng')
  const currentDate: string = dayjs().format('MM/DD/YYYY')
  const [reportDate, setReportDate] = useState<Date>(null)
  const [reportConclusion, setReportConclusion] = useState<string>('')
  const {doctor, setDoctor} = useDoctorDetails()
  const {setSelectedTests} = useSelectedTests()
  const maxCount: number = 500
  const {selectedPendingOrder} = usePendingLabOrderContext()
  const [showReportConclusionLabel, setShowReportConclusionLabel] = useState<
    boolean
  >(true)
  const [isSaveButtonClicked, setIsSaveButtonClicked] = useState(false)
  const [labResult, setLabResult] = useState(new Map())

  const testResultData = []
  const handleDiscard = () => {
    setReportDate(null)
    setReportConclusion('')
    setSelectedTests([])
    setDoctor(null)
    setShowReportConclusionLabel(true)
    setLabResult(new Map())
  }

  selectedPendingOrder.forEach(selectedPendingOrder => {
    // eslint-disable-next-line
    const {data: testResults, error: testResultsError} = useSWR<
      TestResultsLabOrder,
      Error
    >(getTestResults(selectedPendingOrder.conceptUuid), fetcher, swrOptions)
    testResultData.push(testResults)
  })

  const isDisabled = () =>
    !reportDate || !doctor || !isValidDataPreset() || isSaveButtonClicked

  const getTestData = test => {
    console.log('test', test)
    for (let index = 0; index < testResultData.length; index++) {
      if (testResultData[index].data.uuid === test.conceptUuid) {
        return testResultData[index].data
      }
    }
  }

  const isInvalid = test => {
    if (labResult.get(test.uuid)?.value !== '') {
      const datatype = test?.datatype.name
      if (
        datatype === 'Coded' &&
        labResult.get(test.uuid)?.codableConceptUuid === undefined
      ) {
        return true
      } else if (
        datatype === 'Numeric' &&
        isNaN(labResult.get(test.uuid)?.value)
      ) {
        return true
      } else if (
        datatype === 'Boolean' &&
        labResult.get(test.uuid)?.value.toLowerCase() !== 'true' &&
        labResult.get(test.uuid)?.value.toLowerCase() !== 'false'
      ) {
        return true
      }
    }
    return false
  }

  const isValidDataPreset = () => {
    if (labResult.size == 0 || labResult.size !== selectedPendingOrder.length)
      return false

    for (let mapEntry of labResult.values()) {
      if (mapEntry.value === '') return false
    }

    for (let index = 0; index < testResultData.length; index++) {
      for (let mapEntry of labResult.keys())
        if (testResultData[index].data.uuid === mapEntry) {
          if (isInvalid(testResultData[index].data)) {
            return false
          }
        }
    }

    return true
  }



  const renderButtonGroup = () => (
    <div className={styles.overlayButtons}>
      <Button onClick={handleDiscard} kind="secondary" size="lg">
        Discard
      </Button>
      <Button
        onClick={() => {
          setIsSaveButtonClicked(true), saveTestResults(), closeHandler()
        }}
        size="lg"
        disabled={isDisabled()}
      >
        Save and Upload
      </Button>
    </div>
  )

  const saveTestResults = async () => {
    console.log('Inside saveTestResults')
    const ac = new AbortController()
    let allSuccess: boolean = true
    try {
      for (let index = 0; index < selectedPendingOrder.length; index++) {
        console.log('first', selectedPendingOrder[index])
        const response = await saveTestDiagnosticReport(
          undefined,
          patientUuid,
          doctor.uuid,
          reportDate,
          reportConclusion,
          ac,
          selectedPendingOrder[index],
          labResult,
          getTestData(selectedPendingOrder[index]).datatype,
        )
        if (allSuccess && !response.ok) {
          allSuccess = false
          break
        }
      }
    } catch (e) {
      allSuccess = false
    }
    if (allSuccess) {
      setLabResult(new Map())
      saveHandler(true)
    } else {
      saveHandler(false)
    }
  }

  const getTestNameWithUnits = test => {
    if (test.units) {
      return test.hiNormal && test.lowNormal
        ? `${getTestName(test)} [${test.lowNormal} - ${test.hiNormal} ${
            test.units
          }]`
        : `${getTestName(test)} ${test.units}`
    }
    return getTestName(test)
  }
  const isAbnormal = (value, test) => {
    return (
      test.lowNormal !== null &&
      test.hiNormal !== null &&
      (value < test.lowNormal || value > test.hiNormal)
    )
  }

  const getConceptUuidForAnswer = (test, value) => {
    const dataType = test?.datatype.name

    if (dataType === 'Coded') {
      const answers = test?.answers
      for (let index = 0; index < answers.length; index++) {
        if (answers[index].name.name.toLowerCase() === value.toLowerCase())
          return answers[index].uuid
      }
    }
  }

  const updateOrStoreLabResult = (value, test) => {
    if (value !== null || value !== undefined || !isNaN(value)) {
      if (isAbnormal(value, test)) {
        setLabResult(
          map =>
            new Map(
              map.set(test.uuid, {
                value: value,
                abnormal: true,
              }),
            ),
        )
      } else if (test?.datatype.name === 'Coded') {
        setLabResult(
          map =>
            new Map(
              map.set(test.uuid, {
                value: value,
                codableConceptUuid: getConceptUuidForAnswer(test, value),
              }),
            ),
        )
      } else
        setLabResult(
          map =>
            new Map(
              map.set(test.uuid, {
                value: value,
              }),
            ),
        )
    }
  }

  const getValue = test => labResult.get(test.uuid)?.value ?? ''

  const renderInputField = (test, index) => {
    if (test) {
      return (
        <div className={styles.testresultinputfield}>
          <TextInput
            key={`text-${test.uuid}-${index}`}
            labelText={getTestNameWithUnits(test)}
            id={`${test.uuid}-${index}`}
            placeholder="Input Text"
            size="sm"
            onChange={e => updateOrStoreLabResult(e.target.value, test)}
            style={labResult.get(test.uuid)?.abnormal ? {color: 'red'} : {}}
            value={getValue(test)}
            invalid={labResult.size != 0 && isInvalid(test)}
            invalidText="Please enter valid data"
          />
        </div>
      )
    }
  }
  const renderTestResultWidget = () => {
    return (
      <>
        {testResultData.map((testResult, index) =>
          testResult?.data.conceptClass?.name === 'LabSet'
            ? testResult?.data.setMembers.map((test, index) =>
                renderInputField(test, index),
              )
            : renderInputField(testResult?.data, index),
        )}
      </>
    )
  }

  return (
    <Overlay
      close={closeHandler}
      header={header}
      buttonsGroup={renderButtonGroup()}
    >
      <div className={styles.controlFields}>
        {testResultData.length > 0
          ? renderTestResultWidget()
          : console.log('else condition on overlay')}
        <DatePicker
          className={styles.datePicker}
          datePickerType="single"
          locale={locale}
          short={true}
          value={reportDate}
          maxDate={currentDate}
          onChange={(selectedDate: Date[]) => setReportDate(selectedDate[0])}
          allowInput={false}
        >
          <label id="reportDateLabel">
            <DatePickerInput
              placeholder="mm/dd/yyyy"
              labelText="Report Date"
              id="reportDate"
            />
          </label>
        </DatePicker>
        <br></br>
        <div
          className={'bx--label'}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '2px 0px 2px 0px',
            width: '100%',
          }}
        >
          Requested by
        </div>
        <DoctorListDropdown />
      </div>
      {showReportConclusionLabel ? (
        <Button
          role="button"
          kind="ghost"
          onClick={() => {
            setShowReportConclusionLabel(false)
          }}
        >
          Click to record clinical conclusion
        </Button>
      ) : (
        <div style={{paddingTop: '1rem'}}>
          <div
            className={'bx--label'}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '2px 0px 2px 0px',
              width: '100%',
            }}
          >
            Report Conclusion{' '}
            <span id="counter">{`${reportConclusion?.length}/${maxCount}`}</span>
          </div>
          <TextArea
            data-testId="conclusion"
            labelText=""
            maxLength={maxCount}
            required={true}
            value={reportConclusion}
            onChange={e => setReportConclusion(e.target.value)}
          />
        </div>
      )}
    </Overlay>
  )
}

export default TestResults
