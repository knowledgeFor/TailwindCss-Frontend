import FixedHeaderTable from '../../components/FixedHeaderTableComponent'
import HoldAmount from './holdAmount'
import HoldRevenue from './holdRevenue'
import PayoutDistribution from './payoutDistribution'
import PayoutOvertimeChart from './payoutOvertime'
import {
  tableData,
  tableHeaderDisplayColumns,
  tableHeaderTypeColumns
} from '../../constants/morkupData'

const Revenue = () => {
  return (
    <div className="w-full flex flex-col  md:min-h-[calc(100vh-56px)] z-50 gap-2 md:gap-7 p-4 md:p-0 md:pt-4">
      <div className="w-full md:flex hidden text-3xl font-bold text-white">
        Revenue Share
      </div>
      <div className="w-full flex flex-col lg:flex-row z-50 gap-2 lg:gap-7">
        <div className="lg:w-[56%] w-full flex flex-col z-50 bg-gray border border-white-300 rounded-xl p-7 ">
          <HoldRevenue />
          <div className="w-full flex flex-col lg:flex-row justify-between items-center pt-3 lg:px-7 lg:bg-black mt-2 rounded-xl gap-2 py-4 mt-auto">
            <HoldAmount label="Amount Earned" amount="$5961.28" />
            <HoldAmount label="Pending Payouts" amount="12" />
            <HoldAmount label="Completed Payouts" amount="73" />
          </div>
        </div>
        <div className="lg:w-[44%] w-full flex flex-col z-50 gap-2 lg:gap-7">
          <div className="w-full flex flex-col z-50 bg-gray border border-white-300 rounded-xl p-4">
            <div className="font-bold text-xl">Payouts Over Time</div>
            <div className="w-full h-[150px] pt-4">
              <PayoutOvertimeChart />
            </div>
          </div>
          <div className="w-full flex flex-row z-50 bg-gray border border-white-300 rounded-xl p-4">
            <PayoutDistribution />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col h-full z-50 bg-gray border border-white-300 rounded-xl p-4">
        <div className="font-bold text-xl">Revenue Share Payouts</div>
        <FixedHeaderTable
          height="max-h-[calc(100vh-730px)]"
          data={tableData}
          columns={tableHeaderDisplayColumns}
        />
      </div>
    </div>
  )
}

export default Revenue
