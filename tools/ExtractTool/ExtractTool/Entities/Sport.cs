using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace ExtractTool.Entities
{
    public class Sport
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("attributes")]
        public SportAttributes Attributes { get; set; }

        public bool IsParent => this.Attributes?.ParentId != null;
    }
}
