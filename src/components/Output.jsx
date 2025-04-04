import { useState } from "react";
import { executeCode } from "../api";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      alert(error.message || "Unable to run code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-1/2">
      <p className="mb-2 text-lg">Output</p>
      <button
        className={`mb-4 px-4 py-2 border rounded ${isLoading ? 'cursor-wait bg-gray-300' : 'bg-green-500 text-white'}`}
        onClick={runCode}
        disabled={isLoading}
      >
        {isLoading ? 'Running...' : 'Run Code'}
      </button>
      <div
        className={`h-[86%] p-2 border ${isError ? 'border-red-500 text-red-400' : 'border-gray-800'}`}
      >
        {output
          ? output.map((line, i) => <p key={i}>{line}</p>)
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};

export default Output;
