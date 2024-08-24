

import html from "./index.html";
import js from "./index.js";

// const SolveSimple = async (examCode: string, questionId: string) => {
// 	var Data = await fetch(`https://api.observablehq.com/@rsamec/${examCode}.js`, {
// 		method: "POST",
// 		headers: {
// 			"content-type": "application/json",
// 		},
// 		body: JSON.stringify({
// 			"latexExpression": Latex,
// 			"clientInfo": {
// 				"mkt": Language,
// 			}
// 		}),
// 	});
// 	Data = await Data.json();
// 	Data = Data["solution"];
// 	if (Data["isError"]) {
// 		throw Data["errorMessage"];
// 	}
// 	return Data;
// }

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const { method } = request;
		const path = new URL(request.url).pathname;
		if (method === "GET") {
			if (path === "/") {
				return new Response(html, { status: 200, headers: { "Content-Type": "text/html" } });
			}
			else if (path === "/index.js") {
				return new Response(js, { status: 200, headers: { "Content-Type": "application/javascript" } });
			}			
			else {
				return new Response("Not found", { status: 404 });
			}
		} else if (method === "POST") {
			var Result = {
				"Success": true,
				"Error": "",
				"Data": {},
			};
			try {
				const { LatexExpression, Language } = await request.json();
				if (!LatexExpression) {
					Result.Success = false;
					Result.Error = "Please provide a latex expression";
				}
				if (path === "/SolveLatex") {
					// Result.Data = await SolveMathProblem(LatexExpression, Language || "en");
				}
				else if (path === "/SolveSimpleLatex") {
					// Result.Data = await SolveSimple(LatexExpression, Language || "en");
				}
				else {
					Result.Success = false;
					Result.Error = "Not found";
				}
				console.log(Result);
			}
			catch (ErrorDetail) {
				Result.Success = false;
				Result.Error = ErrorDetail;
			}
			return new Response(JSON.stringify(Result), { status: 200, headers: { "Content-Type": "application/json" } });
		}
		return new Response("Method not allowed", { status: 405 });
	},
};
