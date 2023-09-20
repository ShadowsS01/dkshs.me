/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  defineDocumentType,
  makeSource,
  type ComputedFields,
} from "contentlayer/source-files";
import { MDX_CODE_THEME } from "./src/data";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

const computedFields: ComputedFields = {
  path: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
};

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: "./projects/**/*.mdx",
  contentType: "mdx",

  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    githubUrl: { type: "string", required: true },
    demoUrl: { type: "string" },
    image: { type: "string" },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "./src/data",
  documentTypes: [Project],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: MDX_CODE_THEME,
          onVisitLine(node: any) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className = ["line--highlighted"];
          },
          onVisitHighlightedWord(node: any) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
    ],
  },
});
