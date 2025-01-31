import React, { useState } from 'react'
import InputField from '../../components/InputFieldComponent'

const StakeContent: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<string>('Stake')
  const [amount, setAmount] = useState<string>('0')

  return (
    <div className="flex flex-col w-full xl:w-[calc(45%-0.875rem)] bg-gray rounded-xl gap-7 p-7">
      <div className="flex flex-row justify-between text-center gap-2 xl:gap-2 2xl:gap-7">
        <div
          onClick={() => setSelectedAction('Stake')}
          className={`text-sm py-2 w-[82px] md:w-[160px] rounded-xl border ${selectedAction == 'Stake' ? 'border-green text-whtie-full' : 'border-[#00FF5B40] text-white-400'} cursor-pointer`}
        >
          Stake
        </div>
        <div
          onClick={() => setSelectedAction('Unstake')}
          className={`text-sm py-2 w-[82px] md:w-[160px] rounded-xl border ${selectedAction == 'Unstake' ? 'border-green text-whtie-full' : 'border-[#00FF5B40] text-white-400'} cursor-pointer`}
        >
          Unstake
        </div>
        <div
          onClick={() => setSelectedAction('Withdraw')}
          className={`text-sm py-2 w-[82px] md:w-[160px] rounded-xl border ${selectedAction == 'Withdraw' ? 'border-green text-whtie-full' : 'border-[#00FF5B40] text-white-400'} cursor-pointer`}
        >
          Withdraw
        </div>
      </div>
      <div className="flex flex-row justify-around ">
        <div className="w-full md:w-[80%] flex flex-col gap-7">
          {selectedAction !== 'Withdraw' && (
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-between text-white">
                <div
                  className={selectedAction === 'Stake' ? 'block' : 'hidden'}
                >
                  Amount:
                </div>
                <div
                  className={selectedAction === 'Unstake' ? 'block' : 'hidden'}
                >
                  Available To Unstake:
                </div>
                <div className="font-circularBook">
                  Balance: 2561331 $Botify
                </div>
              </div>
              <InputField
                onChange={(val) => setAmount(val)}
                value={amount}
                align="right"
                iconString="Max"
              />
            </div>
          )}
          {selectedAction === 'Withdraw' && (
            <div className="w-full pt-10 flex flex-col gap-7">
              <div className="flex flex-row justify-between items-end">
                <div>
                  <div className="text-sm font-circularBook">
                    Available To Withdraw
                  </div>
                  <div className="text-2xl">0</div>
                </div>
                <div
                  onClick={() => {}}
                  className={`text-sm py-2 w-[82px] text-center md:w-[160px] rounded-xl border border-green text-whtie-full cursor-pointer`}
                >
                  Withdraw
                </div>
              </div>
              <div className="flex flex-row justify-end text-center">
                <div
                  onClick={() => {}}
                  className={`text-sm py-2 w-[82px] md:w-[160px] rounded-xl border border-green text-whtie-full cursor-pointer`}
                >
                  Claim
                </div>
              </div>
            </div>
          )}
          {selectedAction === 'Stake' && (
            <React.Fragment>
              <div className="flex flex-row justify-between">
                <div>Estimated APY</div>
                <div className="font-circularBook">64%</div>
              </div>
              <div className="flex flex-row justify-between">
                <div>Amount Received</div>
                <div className="font-circularBook">6 $Botify</div>
              </div>
            </React.Fragment>
          )}

          {selectedAction === 'Unstake' && (
            <div className="flex flex-row justify-between">
              <div>ECooldown</div>
              <div className="font-circularBook">6d 7h 21m</div>
            </div>
          )}
        </div>
      </div>
      {selectedAction !== 'Withdraw' && (
        <div className="flex flex-row justify-center content-end">
          <div className="text-white text-lg py-1 px-[100px] rounded-xl border border-green">
            {selectedAction}
          </div>
        </div>
      )}
    </div>
  )
}

export default StakeContent
