use wasm_bindgen::prelude::*;
use comrak::{markdown_to_html, ComrakOptions};

#[wasm_bindgen]
pub fn render(s: &str) -> String {
  return markdown_to_html(s, &ComrakOptions::default());
}
