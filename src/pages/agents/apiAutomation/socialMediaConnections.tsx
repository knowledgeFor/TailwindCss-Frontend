import React, { useState } from 'react'
import SvgIconComponent from '../../../components/SvgIconComponent'
import InputField from '../../../components/InputFieldComponent'

// Define a type for the connections state
interface Connections {
  xApiKey: string
  xApiSecretKey: string
  xAccessToken: string
  xAccessTokenSecret: string
  telegramApiId: string
  telegramApiHash: string
  discordToken: string
  discordGuildId: string
  slackAppToken: string
  slackBotToken: string
}

const SocialMediaConnections: React.FC = () => {
  const [connections, setConnections] = useState<Connections>({
    xApiKey: '',
    xApiSecretKey: '',
    xAccessToken: '',
    xAccessTokenSecret: '',
    telegramApiId: '',
    telegramApiHash: '',
    discordToken: '',
    discordGuildId: '',
    slackAppToken: '',
    slackBotToken: ''
  })

  const handleChange = (key: keyof Connections, value: string) => {
    setConnections((prevState) => ({
      ...prevState,
      [key]: value
    }))
  }

  const handleSave = () => {
    console.log('Saving Connections:', connections)
  }

  return (
    <div className="w-full h-full flex flex-col gap-5 lg:min-h-[calc(100vh-222px)] pb-[80px] bg-gray rounded-xl p-7 relative">
      <div className="text-2xl">Social Media Connections</div>

      {/* X (Formerly Twitter) */}
      <div className="flex flex-row items-center gap-2">
        <SvgIconComponent name="colorX" size="24px" />
        <div className="text-lg">X (Formerly Twitter)</div>
      </div>
      <div className="flex flex-row flex-wrap gap-7">
        <div className="2xl:w-1/5 xl:w-1/4">
          <InputField
            label="API Key"
            value={connections.xApiKey}
            onChange={(value) => handleChange('xApiKey', value)}
            placeholder="Your API Key"
          />
        </div>
        <div className="2xl:w-1/5 xl:w-1/4">
          <InputField
            label="API Secret Key"
            value={connections.xApiSecretKey}
            onChange={(value) => handleChange('xApiSecretKey', value)}
            placeholder="Your API Secret Key"
          />
        </div>
        <div className="2xl:w-1/5 xl:w-1/4">
          <InputField
            label="Access Token"
            value={connections.xAccessToken}
            onChange={(value) => handleChange('xAccessToken', value)}
            placeholder="Your Access Token"
          />
        </div>
        <div className="2xl:w-1/5 xl:w-1/4">
          <InputField
            label="Access Token Secret"
            value={connections.xAccessTokenSecret}
            onChange={(value) => handleChange('xAccessTokenSecret', value)}
            placeholder="Your Access Token Secret"
          />
        </div>
      </div>

      {/* Telegram */}
      <div className="flex flex-row items-center gap-2">
        <SvgIconComponent name="colorTg" size="24px" />
        <div className="text-lg">Telegram</div>
      </div>
      <div className="flex flex-row flex-wrap gap-7">
        <div className="2xl:w-1/5 xl:w-1/4">
          <InputField
            label="API Id"
            value={connections.telegramApiId}
            onChange={(value) => handleChange('telegramApiId', value)}
            placeholder="Your API Id"
          />
        </div>
        <div className="2xl:w-1/5 xl:w-1/4">
          <InputField
            label="API Hash"
            value={connections.telegramApiHash}
            onChange={(value) => handleChange('telegramApiHash', value)}
            placeholder="Your API Hash"
          />
        </div>
      </div>

      {/* Discord */}
      <div className="flex flex-row items-center gap-2">
        <SvgIconComponent name="colorDiscord" size="24px" />
        <div className="text-lg">Discord</div>
      </div>
      <div className="flex flex-row flex-wrap gap-7">
        <div className="2xl:w-1/5 xl:w-1/4">
          <InputField
            label="Discord Token"
            value={connections.discordToken}
            onChange={(value) => handleChange('discordToken', value)}
            placeholder="Your Discord Bot Token"
          />
        </div>
        <div className="2xl:w-1/5 xl:w-1/4">
          <InputField
            label="Discord Guild ID"
            value={connections.discordGuildId}
            onChange={(value) => handleChange('discordGuildId', value)}
            placeholder="Your Discord Server ID"
          />
        </div>
      </div>

      {/* Slack */}
      <div className="flex flex-row items-center gap-2">
        <SvgIconComponent name="colorSlack" size="24px" />
        <div className="text-lg">Slack</div>
      </div>
      <div className="flex flex-row flex-wrap gap-7">
        <div className="2xl:w-1/5 xl:w-1/4">
          <InputField
            label="Slack App Token"
            value={connections.slackAppToken}
            onChange={(value) => handleChange('slackAppToken', value)}
            placeholder="Your Slack App Token"
          />
        </div>
        <div className="2xl:w-1/5 xl:w-1/4">
          <InputField
            label="Slack Bot Token"
            value={connections.slackBotToken}
            onChange={(value) => handleChange('slackBotToken', value)}
            placeholder="Your Slack Bot Token"
          />
        </div>
      </div>

      {/* Save Button */}
      <div
        onClick={handleSave}
        className="bg-green text-black rounded-xl px-10 cursor-pointer py-3 font-base text-center absolute left-7 bottom-7"
      >
        Save Connections
      </div>
    </div>
  )
}

export default SocialMediaConnections
