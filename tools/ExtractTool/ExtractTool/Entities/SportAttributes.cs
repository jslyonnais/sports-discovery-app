using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace ExtractTool.Entities
{
    public class SportAttributes
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("parent_id")]
        public int? ParentId { get; set; }

        [JsonProperty("decathlon_id")]
        public int? DecathlonId { get; set; }

        [JsonProperty("slug")]
        public string Slug { get; set; }

        [JsonProperty("locale")]
        public string Locale { get; set; }
    }
}
