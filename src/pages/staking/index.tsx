import FixedHeaderTable from '../../components/FixedHeaderTableComponent'
import {
  tableData,
  tableHeaderDisplayColumns,
  tableHeaderTypeColumns
} from '../../constants/morkupData'
import StakeContent from './stakeContent'
import TotalValueLockedChart from './totalValueLockedChart'

const StakingPage = () => {
  return (
    <div className="w-full flex flex-col h-full md:min-h-[calc(100vh-56px)] z-50 gap-2 md:gap-7 p-4 md:p-0 md:pt-4">
      <div className="w-full md:flex hidden text-3xl font-bold text-white">
        Staking
      </div>
      <div className="w-full flex flex-col xl:flex-row gap-2 md:gap-7 items-stretch">
        <StakeContent />
        <div className="w-full xl:w-[calc(55%-0.875rem)] hidden md:block bg-gray rounded-xl p-7">
          <div className="text-xl text-white-full font-bold">
            Total Value Locked
          </div>
          <div className="h-[300px]">
            <TotalValueLockedChart />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col z-50 bg-gray rounded-xl p-4">
        <div className="font-bold text-xl">Staking History</div>
        <FixedHeaderTable
          height="h-[calc(100vh-676px)]"
          data={tableData}
          columns={tableHeaderDisplayColumns}
        />
      </div>
    </div>
  )
}

export default StakingPage
